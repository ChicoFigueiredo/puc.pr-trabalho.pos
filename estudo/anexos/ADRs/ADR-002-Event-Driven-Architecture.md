# ADR-002: Event-Driven Architecture para Propagação

**Status**: Accepted  
**Data**: 01/08/2025  
**Arquitetos**: João Santos, Pedro Lima  
**Stakeholders**: Maria Silva (PO), Roberto Alves (DevOps)  

## Contexto

A arquitetura atual utiliza polling para verificação de mudanças de parâmetros, com as seguintes limitações:

### Limitações do Polling Atual
- **Latência Inerente**: Intervalo mínimo de 30 segundos entre verificações
- **SLA Inadequado**: Impossível garantir 2 minutos para parâmetros críticos
- **Consumo Desnecessário**: APIs fazem polling mesmo sem mudanças
- **Overhead de Rede**: Requests constantes para verificar se há updates
- **Escalabilidade Limitada**: Linear increase de load com número de clientes

### Requisitos de Negócio
- **SLA Crítico**: 2 minutos para propagação de parâmetros críticos
- **SLA Importante**: 10 minutos para parâmetros importantes
- **SLA Normal**: 30 minutos para parâmetros normais
- **Eficiência**: Reduzir overhead de rede e processamento
- **Escalabilidade**: Suportar 1000+ APIs clientes

### Alternativas Avaliadas

#### 1. Reduzir Intervalo de Polling
**Prós**: Mudança mínima, baixo risco  
**Contras**: Overhead exponencial, custo proibitivo, não garante SLA de 2 min  

#### 2. Server-Sent Events (SSE)
**Prós**: Padrão HTTP, simplicidade  
**Contras**: Limitação de conexões, não suporta bi-direcional  

#### 3. WebSockets Customizado
**Prós**: Bi-direcional, controle total  
**Contras**: Complexidade de infraestrutura, não Azure-native  

#### 4. Azure Event Grid + SignalR (Escolhida)
**Prós**: Managed service, escalabilidade automática, confiabilidade  
**Contras**: Vendor lock-in, complexidade inicial  

## Decisão

**Implementar arquitetura orientada a eventos usando Azure Event Grid e SignalR para propagação de mudanças críticas, mantendo polling como fallback.**

### Arquitetura Proposta

#### Event Flow
![Event Flow](./mermaid/svg/event_flow.svg)

#### Componentes

##### Azure Event Grid
- **Custom Topics**: `parameter-changes`, `critical-parameter-changes`
- **Event Schema**: CloudEvents v1.0
- **Delivery**: At-least-once com retry automático
- **Dead Letter**: Service Bus para eventos não entregues

##### SignalR Service
- **Tier**: Standard (auto-scaling)
- **Hub**: `ParameterNotificationHub`
- **Groups**: Por domain/criticality para targeting
- **Authentication**: Azure AD JWT validation

##### SDK Client
- **Connection**: Automatic reconnection com exponential backoff
- **Fallback**: Polling ativado se SignalR falhar
- **Circuit Breaker**: Hystrix pattern para resilience

### Event Schema

#### Parameter Change Event
```json
{
  "specversion": "1.0",
  "type": "caixa.parameters.parameter-changed",
  "source": "/sinbm/configuration-management",
  "id": "param-change-2025-08-001",
  "time": "2025-08-01T14:30:00Z",
  "datacontenttype": "application/json",
  "subject": "login.timeout.api",
  "data": {
    "parameterId": "login.timeout.api",
    "domain": "login",
    "criticality": "critical",
    "version": "v1.2.3",
    "changeType": "update",
    "affectedClients": ["api-login", "api-authentication"],
    "metadata": {
      "requestId": "cr-2025-08-001",
      "approver": "maria.silva@caixa.gov.br",
      "reason": "Performance optimization"
    }
  }
}
```

#### Critical Parameter Change Event
```json
{
  "specversion": "1.0",
  "type": "caixa.parameters.critical-parameter-changed",
  "source": "/sinbm/configuration-management",
  "id": "critical-change-2025-08-001",
  "time": "2025-08-01T14:30:00Z",
  "datacontenttype": "application/json",
  "subject": "antifraude.threshold.amount",
  "data": {
    "parameterId": "antifraude.threshold.amount",
    "domain": "antifraude",
    "criticality": "critical",
    "urgency": "immediate",
    "version": "v2.1.0",
    "changeType": "emergency-update",
    "previousValue": {"threshold": 10000},
    "newValue": {"threshold": 5000},
    "rollbackVersion": "v2.0.8",
    "metadata": {
      "emergencyApprover": "security-team@caixa.gov.br",
      "incident": "INC-2025-08-001",
      "reason": "Fraud pattern detected"
    }
  }
}
```

## Implementação

### Configuration Management API Changes
```csharp
public class ParameterController : ControllerBase
{
    private readonly IEventGridPublisher _eventPublisher;
    
    [HttpPut("{id}/approve")]
    public async Task<IActionResult> ApproveParameter(string id, ApprovalRequest request)
    {
        var parameter = await _parameterService.ApproveAsync(id, request);
        
        // Publish event based on criticality
        var eventType = parameter.Criticality == Criticality.Critical 
            ? "caixa.parameters.critical-parameter-changed"
            : "caixa.parameters.parameter-changed";
            
        await _eventPublisher.PublishAsync(eventType, parameter.ToEvent());
        
        return Ok(parameter);
    }
}
```

### Distribution Service Integration
```csharp
[FunctionName("ProcessParameterChange")]
public static async Task ProcessParameterChange(
    [EventGridTrigger] EventGridEvent eventData,
    [SignalR(HubName = "ParameterNotificationHub")] IAsyncCollector<SignalRMessage> signalRMessages)
{
    var parameterEvent = eventData.Data.ToObjectFromJson<ParameterChangeEvent>();
    
    // Invalidate cache
    await _cacheService.InvalidateAsync(parameterEvent.ParameterId);
    
    // Notify specific groups
    var groups = GetTargetGroups(parameterEvent);
    
    foreach (var group in groups)
    {
        await signalRMessages.AddAsync(new SignalRMessage
        {
            GroupName = group,
            Target = "ParameterChanged",
            Arguments = new[] { parameterEvent }
        });
    }
}
```

### SDK Client Implementation
```csharp
public class ConfigurationClient : IConfigurationClient
{
    private readonly HubConnection _signalRConnection;
    private readonly IPollingService _pollingFallback;
    private readonly CircuitBreaker _circuitBreaker;
    
    public async Task InitializeAsync()
    {
        // Setup SignalR connection
        _signalRConnection = new HubConnectionBuilder()
            .WithUrl(_options.SignalREndpoint, options =>
            {
                options.AccessTokenProvider = () => GetAccessTokenAsync();
            })
            .WithAutomaticReconnect(new[] { 
                TimeSpan.Zero, 
                TimeSpan.FromSeconds(2),
                TimeSpan.FromSeconds(10),
                TimeSpan.FromSeconds(30)
            })
            .Build();
            
        _signalRConnection.On<ParameterChangeEvent>("ParameterChanged", OnParameterChanged);
        
        await _circuitBreaker.ExecuteAsync(async () =>
        {
            await _signalRConnection.StartAsync();
        });
        
        // Start polling as fallback
        _pollingFallback.Start();
    }
    
    private async Task OnParameterChanged(ParameterChangeEvent changeEvent)
    {
        _logger.LogInformation("Received real-time parameter change: {ParameterId}", 
            changeEvent.ParameterId);
            
        // Update local cache
        await _localCache.InvalidateAsync(changeEvent.ParameterId);
        
        // Trigger refresh
        await RefreshParameterAsync(changeEvent.ParameterId);
        
        // Emit event for application
        ParameterChanged?.Invoke(this, new ParameterChangedEventArgs(changeEvent));
    }
}
```

## Consequências

### Impactos Positivos

#### Performance e Latência
- **Real-time Updates**: < 5 segundos para 99% dos clientes conectados
- **Reduced Polling**: 80% redução no número de requests desnecessários
- **Network Efficiency**: Push elimina polling overhead
- **Scalability**: Linear scaling com Azure SignalR Service

#### SLA Achievement
- **Critical Parameters**: < 2 minutos garantido
- **Important Parameters**: < 10 minutos consistente
- **Normal Parameters**: < 30 minutos melhorado para < 5 minutos

#### Operational Benefits
- **Observability**: Event-driven metrics e tracing
- **Reliability**: Automatic retry e dead letter handling
- **Monitoring**: Real-time visibility de propagation

### Impactos Negativos

#### Complexidade Arquitetural
- **Additional Components**: Event Grid, SignalR, Functions
- **State Management**: Connection state tracking
- **Error Handling**: Event delivery failures, connection drops
- **Testing**: Integration testing mais complexo

#### Operational Overhead
- **Monitoring**: Novas métricas para events e connections
- **Troubleshooting**: Distributed tracing necessário
- **Cost**: SignalR Service + Event Grid + Functions
- **Dependencies**: Maior surface area para falhas

#### Development Impact
- **Learning Curve**: Event-driven patterns
- **SDK Complexity**: Dual-mode operation (push + polling)
- **Connection Management**: WebSocket lifecycle
- **Testing**: Mock de eventos e connections

### Estratégias de Mitigação

#### Reliability Patterns
```yaml
Resilience Patterns:
  Circuit Breaker:
    - SignalR connection failures → fallback to polling
    - Event Grid unavailable → direct cache invalidation
    - Dead letter threshold → alert operations team
    
  Retry Policies:
    - SignalR reconnection: exponential backoff up to 30s
    - Event delivery: 3 retries with exponential backoff
    - Connection establish: immediate + 2s + 10s + 30s
    
  Fallback Strategy:
    - Primary: SignalR push notifications
    - Secondary: Polling with reduced interval (60s)
    - Tertiary: Local cache with extended TTL
    - Last resort: Embedded configuration files
```

#### Monitoring Strategy
```yaml
Key Metrics:
  - signalr_connections_active: Number of active connections
  - event_delivery_latency_p95: Event delivery latency percentile
  - parameter_propagation_time: End-to-end propagation time
  - polling_fallback_usage: Percentage of clients using fallback
  
Alerts:
  - Event delivery failure rate > 1%
  - SignalR connection drop rate > 5%
  - Parameter propagation time > SLA thresholds
  - Dead letter queue depth > 10 messages
```

#### Cost Optimization
```yaml
Cost Controls:
  SignalR Service:
    - Auto-scaling based on connections
    - Unit limit: 100 units max
    - Monitoring: Connection count trends
    
  Event Grid:
    - Pay-per-event pricing
    - Estimated: 50K events/month = ~R$ 50/month
    - Optimization: Batch events where possible
    
  Azure Functions:
    - Consumption plan for event processing
    - Estimated: 100K executions/month = ~R$ 80/month
```

## Compliance

### LGPD - Lei Geral de Proteção de Dados
✅ **Data Minimization**: Events contêm apenas metadata necessário  
✅ **Purpose Limitation**: Eventos usados apenas para sincronização  
✅ **Retention**: Events TTL de 7 dias no Event Grid  
✅ **Consent**: Implicit consent através do uso da API  

### BCB Resolução 4658 - Segurança Cibernética
✅ **Data Sovereignty**: Event Grid e SignalR no Brasil  
✅ **Encryption**: TLS 1.3 para todas as conexões  
✅ **Access Control**: Azure AD authentication para SignalR  
✅ **Monitoring**: Audit trail para todos os eventos  

### SOX - Controles Internos
✅ **Change Tracking**: Eventos imutáveis como evidência  
✅ **Segregation**: Event publishing separado de consumption  
✅ **Non-repudiation**: Digital signatures nos eventos críticos  
✅ **Evidence**: Dead letter queue como backup de evidências  

## Métricas de Sucesso

### Performance Targets
- **Event Delivery**: < 1 segundo para 95% dos eventos
- **SignalR Latency**: < 500ms para message delivery
- **Connection Success**: > 99% de successful connections
- **Fallback Usage**: < 10% dos clientes usando polling

### Business Impact
- **SLA Compliance**: 100% dos parâmetros críticos em < 2 minutos
- **Cost Reduction**: 30% redução em network overhead
- **Developer Experience**: 50% redução em complaints sobre latência
- **Operational Efficiency**: 80% redução em incidents relacionados a propagação

### Technical Metrics
- **Event Loss Rate**: < 0.01% de eventos perdidos
- **Duplicate Events**: < 1% devido a retry mechanisms
- **Circuit Breaker Trips**: < 5 por dia em média
- **Connection Churn**: < 100 reconnections/hour

## Testing Strategy

### Unit Tests
- Event serialization/deserialization
- Circuit breaker behavior
- Connection retry logic
- Fallback activation

### Integration Tests
- End-to-end event flow
- SignalR connection management
- Event Grid delivery
- Cross-service communication

### Load Tests
- 1000 concurrent SignalR connections
- 10K events/minute throughput
- Connection storm scenarios
- Network partition simulation

### Chaos Engineering
- Event Grid outages
- SignalR service failures
- Network partitions
- High latency scenarios

## Roadmap de Implementação

### Sprint 1-2: Foundation
- [ ] Event Grid setup e configuration
- [ ] SignalR Service provisioning
- [ ] Basic event schema definition
- [ ] SDK connection framework

### Sprint 3-4: Core Features
- [ ] Event publishing no Management API
- [ ] Event processing Functions
- [ ] SignalR integration completa
- [ ] Fallback mechanism implementation

### Sprint 5-6: Production Readiness
- [ ] Monitoring e alerting setup
- [ ] Load testing e optimization
- [ ] Security hardening
- [ ] Documentation e runbooks

### Sprint 7-8: Rollout
- [ ] Canary deployment (10% traffic)
- [ ] Gradual rollout (25%, 50%, 100%)
- [ ] Performance tuning
- [ ] Incident response validation

## Revisão e Aprovação

**Revisores Técnicos**:
- ✅ João Santos (Arquiteto Backend Senior) - 01/08/2025
- ✅ Pedro Lima (Analista Cloud Senior) - 01/08/2025
- ✅ Roberto Alves (DevOps Senior) - 01/08/2025

**Aprovação de Negócio**:
- ✅ Maria Silva (PO Senior) - 01/08/2025

**Revisão de Segurança**:
- ✅ Carlos Oliveira (Arquiteto Backend Senior) - 01/08/2025

**Próxima Revisão**: 01/11/2025 (após 3 meses de produção)  
**Status**: ✅ Aprovado para Implementação
