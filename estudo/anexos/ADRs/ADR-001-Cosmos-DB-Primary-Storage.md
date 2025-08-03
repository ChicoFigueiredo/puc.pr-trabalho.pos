# ADR-001: Cosmos DB como Primary Storage

**Status**: Accepted  
**Data**: 01/08/2025  
**Arquitetos**: João Santos, Carlos Oliveira  
**Stakeholders**: Maria Silva (PO), Pedro Lima (Cloud)  

## Contexto

O sistema atual de parametrização utiliza Azure Blob Storage para armazenar configurações em formato JSON. Esta arquitetura apresenta as seguintes limitações:

### Limitações Atuais
- **Versionamento**: Blob Storage não oferece versionamento nativo robusto
- **Queries**: Impossibilidade de realizar queries complexas nos dados
- **Transações**: Ausência de transações ACID para workflows de aprovação
- **Auditoria**: Dificuldade para rastreamento de mudanças granular
- **Performance**: Latência superior para operações de read/write frequentes

### Requisitos Emergentes
- **SLA Rigoroso**: 2 minutos para propagação de parâmetros críticos
- **Compliance Bancário**: LGPD, SOX, BCB 4658 exigem auditoria detalhada
- **Workflow de Aprovação**: Necessidade de transações para estado consistente
- **Disaster Recovery**: RPO 15 min, RTO 30 min com multi-região

### Alternativas Consideradas

#### 1. Azure SQL Database
**Prós**: Familiaridade da equipe, transações ACID, queries SQL  
**Contras**: Menor flexibilidade para JSON, escalabilidade limitada, custo similar  

#### 2. Manter Blob Storage + Azure Table Storage
**Prós**: Menor custo, mudança mínima  
**Contras**: Complexidade de sincronização, duas fontes de verdade, limitações de query  

#### 3. Redis Enterprise como Primary
**Prós**: Performance superior, estruturas de dados flexíveis  
**Contras**: Persistência questionável, custo elevado, complexidade operacional  

#### 4. Cosmos DB SQL API (Escolhida)
**Prós**: JSON nativo, geo-replicação, transações, performance, escalabilidade  
**Contras**: Custo superior, curva de aprendizado, migração complexa  

## Decisão

**Migrar de Azure Blob Storage para Cosmos DB (SQL API) como repositório principal de parâmetros.**

### Justificativas Técnicas

#### Versionamento e Auditoria
```sql
-- Query para histórico de versões
SELECT c.id, c.version, c.value, c.changeLog.timestamp 
FROM c 
WHERE c.parameterId = "login.timeout.api" 
ORDER BY c.changeLog.timestamp DESC
```

#### Transações ACID para Workflow
```csharp
// Transação para aprovação de parâmetro
using (var transaction = container.CreateTransactionalBatch(partitionKey))
{
    transaction.UpsertItem(approvedParameter);
    transaction.CreateItem(auditEvent);
    transaction.DeleteItem(changeRequest.Id);
    await transaction.ExecuteAsync();
}
```

#### Geo-Replicação para DR
- **Write Region**: Brasil Sul  
- **Read Regions**: Brasil Sudeste, EUA Leste  
- **Consistency**: Session (balanço performance/consistência)  
- **Automatic Failover**: Habilitado  

### Configuração Target

#### Throughput Strategy
- **Database**: Shared throughput 10,000 RU/s
- **Containers**: Autoscale 1,000-50,000 RU/s
- **Partitioning**: `/domain` para distribuição equilibrada

#### Indexing Policy
```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    { "path": "/domain/*" },
    { "path": "/criticality/*" },
    { "path": "/environment/*" },
    { "path": "/currentVersion/*" }
  ],
  "excludedPaths": [
    { "path": "/value/*" },
    { "path": "/_etag/*" }
  ]
}
```

## Consequências

### Impactos Positivos

#### Performance e Escalabilidade
- **Query Performance**: 10x mais rápido para queries complexas
- **Write Performance**: 3x mais rápido para updates
- **Auto-scaling**: Elasticidade automática baseada em RU/s
- **Global Distribution**: Latência reduzida com multi-região

#### Compliance e Governança
- **Change Feed**: Stream de mudanças para auditoria automática
- **Point-in-Time Restore**: Backup contínuo com restore granular
- **Transações ACID**: Consistência garantida para workflows
- **Encryption**: Keys gerenciadas pelo cliente via Key Vault

#### Operacional
- **SLA Microsoft**: 99.999% para multi-região
- **Automatic Failover**: Zero-touch disaster recovery
- **Monitoring**: Integração nativa com Azure Monitor
- **APIs Padronizadas**: REST, SQL, .NET SDK

### Impactos Negativos

#### Financeiro
- **Custo Base**: ~R$ 12,000/mês vs R$ 3,500/mês (Blob Storage)
- **RU/s Consumption**: Custo variável baseado em throughput
- **Storage**: R$ 0.30/GB vs R$ 0.10/GB (3x mais caro)
- **Data Transfer**: Custos de replicação entre regiões

#### Técnico
- **Learning Curve**: 40 horas de treinamento para equipe
- **Migration Complexity**: 6 semanas de migração dual-write
- **Query Language**: SQL syntax específica do Cosmos DB
- **Debugging**: Ferramentas menos maduras que SQL Server

#### Operacional
- **Monitoring**: Novas métricas e alertas para configurar
- **Backup Strategy**: Mudança de processo operacional
- **Troubleshooting**: Runbooks precisam ser reescritos
- **Capacity Planning**: RU/s mais complexo que storage GB

### Estratégias de Mitigação

#### Controle de Custos
```yaml
Cost Controls:
  - Budget Alerts: 80%, 90%, 100% do orçamento mensal
  - Auto-scaling Max: 50,000 RU/s para evitar surpresas
  - Reserved Capacity: 1 ano para 70% da carga base
  - Monitoring: Dashboard específico para custos por container
```

#### Migração Segura
```yaml
Migration Strategy:
  Phase 1: "Dual Write Setup"
    - Aplicação grava em ambos storages
    - Validação de consistência automatizada
    - Rollback imediato se divergência

  Phase 2: "Read Migration"
    - 10% reads do Cosmos DB
    - A/B testing de performance
    - Gradual increase até 100%

  Phase 3: "Write Migration"
    - Cosmos DB torna-se source of truth
    - Blob Storage read-only
    - Validação contínua

  Phase 4: "Cleanup"
    - Deprecação do Blob Storage
    - Cleanup de código legado
    - Documentação final
```

#### Conhecimento e Capacitação
```yaml
Training Plan:
  - Week 1: "Cosmos DB Fundamentals" (todos os devs)
  - Week 2: "SQL API Deep Dive" (arquitetos)
  - Week 3: "Performance Tuning" (senior devs)
  - Week 4: "Operations & Monitoring" (devops)
  - Ongoing: "Best Practices" (knowledge sharing)
```

## Compliance

### LGPD - Lei Geral de Proteção de Dados
✅ **Data Classification**: Metadata tags para classificação automática  
✅ **Encryption**: Customer-managed keys para dados sensíveis  
✅ **Audit Trail**: Change feed para trilha imutável  
✅ **Right to Deletion**: Soft delete com TTL automático  

### BCB Resolução 4658 - Segurança Cibernética
✅ **Data Sovereignty**: Dados permanecem no Brasil  
✅ **Backup Strategy**: Point-in-time restore por 30 dias  
✅ **Access Control**: RBAC integrado com Azure AD  
✅ **Monitoring**: Logs de acesso em tempo real  

### SOX - Controles Internos
✅ **Change Management**: Transações ACID para workflows  
✅ **Segregation of Duties**: Diferentes roles para read/write  
✅ **Evidence**: Audit logs imutáveis por 7 anos  
✅ **Testing**: Automated compliance testing no pipeline  

## Métricas de Sucesso

### Performance
- **Query Latency**: < 10ms para 95% das queries
- **Write Latency**: < 50ms para 95% das writes
- **Throughput**: 2.5M operations/dia sem throttling
- **Availability**: 99.999% uptime medido

### Cost
- **Monthly Budget**: Manter < R$ 15,000/mês
- **Cost per Operation**: < R$ 0.001 por read/write
- **ROI**: Payback em 18 meses via operational efficiency

### Operational
- **Migration Success**: Zero data loss durante migração
- **MTTR**: < 30 minutos para resolução de incidents
- **Change Success Rate**: > 99% de deployments sem rollback

## Revisão e Aprovação

**Revisores Técnicos**:
- ✅ João Santos (Arquiteto Backend Senior) - 01/08/2025
- ✅ Carlos Oliveira (Arquiteto Backend Senior) - 01/08/2025
- ✅ Pedro Lima (Analista Cloud Senior) - 01/08/2025

**Aprovação de Negócio**:
- ✅ Maria Silva (PO Senior) - 01/08/2025
- ✅ Fernanda Rocha (Analista Cloud Senior) - 01/08/2025

**Próxima Revisão**: 01/11/2025 (3 meses pós-implementação)  
**Status**: ✅ Aprovado para Implementação Imediata
