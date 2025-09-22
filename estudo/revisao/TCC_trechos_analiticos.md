# Pacote de trechos prontos para colar no TCC

Abaixo está a versão em **Markdown** dos blocos sugeridos para fortalecer o caráter **analítico** do seu trabalho, alinhado ao **Modelo de Entrega – Arquitetura de Software, Ciência de Dados e Cybersecurity**.

---

# 1) FUNDAMENTAÇÃO TEÓRICA — tornar analítica

## 1.1 Ponte Teoria → Decisão (exemplos que você pode replicar)

**CQRS + Event Sourcing (ES)**  
**Conceito:** separação de comandos/leitura (CQRS) e trilha imutável de alterações (ES).  
**Relevância no parametrizador bancário:** leitura de parâmetros sofre picos em viradas de regra/campanha; auditoria precisa ser completa e à prova de adulteração.  
**Decisão:** leitura via cache hierárquico (Redis + cache in-process) e gravação com “eventos de parâmetro” versionados.  
**Trade-off:** consistência eventual na leitura; mitigação por invalidação dirigida a eventos e política de *stale-while-revalidate*.

**Arquitetura orientada a eventos**  
**Conceito:** publicação/assinatura desacopla produtora e consumidora.  
**Relevância:** distribuir mudanças de parâmetros para múltiplos domínios (canais, pricing, compliance) sem *ripple effect*.  
**Decisão:** `ParameterChanged` emitido no *bus*; assinantes atualizam caches locais e disparam validações.  
**Trade-off:** maior complexidade operacional (idempotência, *dead-letter*); mitigado com *outbox pattern* e DLQ com alarme.

**Observabilidade (logs, métricas, tracing)**  
**Conceito:** *golden signals* (latência, tráfego, erros, saturação) e *distributed tracing*.  
**Relevância:** incidentes de parâmetros impactam risco operacional; é preciso explicar “quem mudou o quê, quando, e com qual efeito”.  
**Decisão:** *tracing* fim-a-fim (W3C Trace Context), logs imutáveis de decisão de parâmetro com *hash chaining*, métricas SLO por operação.  
**Trade-off:** custo de telemetria; mitigado com *sampling* adaptativo.

> **Dica:** replique este formato (Conceito → Relevância → Decisão → Trade-off) para 3–5 conceitos que você já citou (API Management, Zero-Trust, Policy-as-Code, Blue-Green, etc.).

## 1.2 Tabela de rastreabilidade (teoria → decisão → métrica)

| Conceito/Fonte      | Risco/Restrição do domínio                         | Decisão arquitetural                                 | Evidência/Métrica                                       |
|---------------------|-----------------------------------------------------|------------------------------------------------------|---------------------------------------------------------|
| CQRS + ES           | Auditoria completa e baixa latência de leitura     | Eventos versionados + cache hierárquico              | P95 GET /parameters < 100 ms; 0 falhas de reconstrução/mês |
| Event-Driven        | Desacoplamento entre domínios                      | Tópico `parameter.changed` + assinantes              | Lag médio < 2s; DLQ < 0,1%                              |
| Observabilidade     | Explicabilidade de mudanças                        | Tracing + logs encadeados                            | 100% das mudanças com `traceId`; MTTR < 30 min          |
| Rate limiting       | Proteção a APIs críticas                           | APIM com quotas e throttling                         | >99% sem 429 em pico; burst control eficaz              |
| Criptografia & LGPD | Dados pessoais/metadados                           | Encryption at rest + in transit                      | 100% TLS 1.2+; KMS rotacionado a cada 90 dias           |

---

# 2) PERCURSO METODOLÓGICO DA INTERVENÇÃO — justificativas técnicas

## 2.1 Decisões-chave e trade-offs

**API Management vs. Application Gateway**  
**Problema:** governança de consumo por canal/cliente, *throttling* e observabilidade por assinatura.  
**Alternativas:** APIM ⟷ App Gateway.  
**Escolha:** **API Management** com políticas de rate limiting, transform e subscription keys.  
**Trade-offs:** custo maior, porém telemetria/segurança e *onboarding* superiores.

**Cache hierárquico (Redis + in-process)**  
**Problema:** picos de leitura e custo por chamada em datastore.  
**Escolha:** **Redis** como L2, memória da aplicação como L1; TTL curto + invalidação por evento de parâmetro.  
**Trade-off:** risco de *stale*; mitigado por *stale-while-revalidate* e *grace period* configurável.

**Mensageria (fila vs. eventos)**  
**Problema:** distribuição imediata e confiável de mudanças.  
**Escolha:** **eventos** para disseminação ampla e **fila** para fluxos de aprovação/compensação.  
**Trade-off:** duas infraestruturas; mitigado com *outbox* transacional e padrões de idempotência.

**Persistência**  
**Problema:** leitura massiva e versão/auditoria de parâmetros.  
**Escolha:** **document store** para parâmetros + **stream de eventos** para trilha imutável.  
**Trade-off:** modelagem eventual-consistente; mitigada com projeções materializadas.

## 2.2 Threat Modeling (STRIDE resumido)

- **Spoofing (falsificação de chamadas):** mTLS entre serviços; *token binding*; validação `aud`/`iss`.  
- **Tampering (alteração indevida):** assinaturas digitais dos eventos; logs de alteração com *hash chaining*; *WORM storage* para trilhas.  
- **Repudiation (negação de autoria):** *non-repudiation* via assinatura do solicitante e guarda de `traceId` + `requestId`.  
- **Information Disclosure (vazamento):** encryption at rest/in transit; Secrets Manager; mascaramento em logs.  
- **DoS:** rate limiting, circuit breaker, autoscaling por fila.  
- **Elevation of Privilege:** RBAC/ABAC no APIM e serviços; separação de funções (solicitar/aprovar/aplicar).

## 2.3 Dados, LGPD e Segurança

- **Minimização e classificação:** coletar apenas metadados estritamente necessários; marcar campos sensíveis.  
- **Criptografia:** TLS 1.2+ em trânsito; chaves KMS rotacionadas; volumes/dados em repouso cifrados.  
- **Residência/Região:** manter dados e backups em regiões autorizadas; evitar *cross-region* sem base legal.  
- **Retenção:** trilha de alterações de parâmetro mantida por **12 meses** (ajuste conforme política); descarte seguro após prazo.  
- **Acesso e *least privilege*:** RBAC por papel (autor, aprovador, auditor); *break-glass* com registro e revisão.

## 2.4 Evidências operacionais (como você provará que cumpre)

- **Runbooks** para incidentes de parâmetro (rollback por evento).  
- **Relatórios mensais:** SLOs, taxa de 4xx/5xx, uso de quotas, latências P95/P99.  
- **Auditorias:** amostragem de mudanças com `traceId` até o usuário solicitante.

---

# 3) RESULTADOS ESPERADOS — objetivos mensuráveis

- **Latência** `GET /parameters/{key}`: P95 **< 100 ms**; P99 **< 200 ms**.  
- **Disponibilidade** APIs críticas: **≥ 99,9%** mensal; erro 5xx **< 0,1%** das requisições.  
- **Propagação de mudança** (evento → cache atualizado): **< 2 s** em 95% dos casos.  
- **Integridade de trilhas:** 100% dos eventos com *hash chaining* válido; 0 falhas de verificação/mês.  
- **Segurança:** 0 segredos em repositório; 100% de rotação de chaves no prazo; 0 dados sensíveis em logs.  
- **Conformidade:** 100% das mudanças com aprovador distinto do solicitante (SoD).

---

# 4) Declaração oficial de uso de IA (colar no fim da Metodologia ou em nota)

> **Declaração de uso de IA.** Durante a preparação deste Trabalho de Conclusão de Curso, o autor utilizou **ChatGPT (OpenAI, versão 4.0)** e **GitHub Copilot (Microsoft)** para **sugestões preliminares de estrutura textual e revisão de clareza**. Após o uso dessas ferramentas, **todo o conteúdo foi integralmente revisado, editado e validado pelo autor**, que **assume total responsabilidade** pela versão final do texto.

---

# 5) Mapa de conformidade (pode ir no fim da Fundamentação ou no Percurso)

| Requisito institucional/regulatório         | Como a arquitetura atende                                        | Evidência                                 |
|--------------------------------------------|------------------------------------------------------------------|-------------------------------------------|
| Transparência e responsabilidade no uso de IA | Declaração oficial e revisão humana integral                      | Seção “Metodologia” + anexo da declaração |
| Ética/Não-discriminação                    | *Linters* de conteúdo e revisão humana nos textos gerados        | Checklists de revisão                      |
| Privacidade/Segurança                      | TLS, criptografia em repouso, *least privilege*, Secrets Manager | Config as code; relatórios de rotação      |
| Rastreabilidade/Auditoria                  | Event Sourcing + logs imutáveis com *hash chaining*              | Verificação mensal de integridade          |
| Continuidade/Resiliência                   | Autoscaling, circuit breaker, retry/DLQ                          | SLOs e testes de carga/caos                |

---
