# Ata da Reunião - Primeira Rodada de Discussão
## Trabalho de Pós-Graduação - Versão 001

**Data:** 02 de agosto de 2025  
**Tema:** Impactos e ensinamentos do uso de Inteligência Artificial para elaboração de proposta de arquitetura para um parametrizador de dados para canais digitais que permitam mudar parâmetros de produção sem necessidade de deploy para uso na Caixa Economica Federal  
**Coordenação:** Prof. Dr. Mandaporra Total  
**Participantes:**
- Francisco Lima Figueiredo (Estudante)
- Prof. Dr. Mandaporra Total (Coordenação)
- Prof. Dr. Souforda Paguarai (Arquitetura de Software)
- Prof. Dr. Jeferson Mifuidi (Segurança da Informação)
- Prof. Dr. Maiumi Mylaska (Banco de Dados)
- Prof. Dr. Bill Gates (Computação em Nuvem)
- Prof. Dr. Nuvemvu Ada (DevOps)
- Prof. Dr. AgileScrum Master (Desenvolvimento Ágil)
- Prof. Dr. Unity Testão (Testes de Software)
- Prof. Dr. Qualy Bão (Qualidade de Software)
- Prof. Dr. Cascata Ágil (Gestão de Projetos)
- Prof. Dr. Mudai Quieto (Gestão de Mudanças)
- Prof. Dr. Avoado Nanuvem (Consultor Microsoft Azure)
- Prof. Dr. Vendeli Vros (Consultor AWS)

---

## Abertura da Reunião

**Prof. Dr. Mandaporra Total:** Bem-vindos à primeira rodada de discussão do trabalho de pós-graduação do estudante Francisco Lima Figueiredo. O tema proposto é altamente relevante para o atual contexto bancário e tecnológico, especialmente considerando os impactos da IA na arquitetura de sistemas críticos.

## Primeira Rodada de Discussões

### 1. Prof. Dr. Souforda Paguarai (Arquitetura de Software)

**Posicionamento:** O DAS apresentado demonstra uma evolução significativa da arquitetura atual. A migração de Azure Blob Storage para Cosmos DB com arquitetura event-driven é bem fundamentada.

**Contribuições:**
- A aplicação dos padrões CQRS e Event Sourcing está alinhada com as práticas de Martin Fowler em "Padrões de Arquitetura de Aplicações Corporativas"
- A separação entre Configuration Management e Distribution APIs segue os princípios de Arquitetura Limpa de Robert Martin
- Sugiro enfatizar no trabalho a aplicação dos princípios SOLID e como a IA auxiliou na identificação desses padrões

**Sugestão para o trabalho:** Incluir análise comparativa entre arquitetura atual e proposta, destacando benefícios dos padrões arquiteturais utilizados.

### 2. Prof. Dr. Jeferson Mifuidi (Segurança da Informação)

**Posicionamento:** Excelente aderência aos requisitos de compliance bancário. A integração com SISET e COBOL SIPER está bem estruturada.

**Contribuições:**
- Implementação de Private Endpoints e network isolation está correta para ambiente bancário
- Auditoria com Event Hub para Data Lake atende LGPD e SOX
- Criptografia em trânsito e repouso coberta adequadamente
- Falta detalhar controles de acesso granular (RBAC) no trabalho

**Sugestão para o trabalho:** Expandir seção sobre matriz de responsabilidade de segurança entre camadas da arquitetura.

### 3. Prof. Dr. Maiumi Mylaska (Banco de Dados)

**Posicionamento:** A escolha do Cosmos DB é acertada para este caso de uso. Multi-region write e consistent prefix atendem os requisitos.

**Contribuições:**
- Versionamento nativo do Cosmos DB resolve problema de auditoria
- Geo-replicação atende requisitos de DR
- Estratégia de cache multi-layer bem estruturada
- Sugiro incluir análise de custos de RU (Request Units) no Cosmos DB

**Sugestão para o trabalho:** Detalhar estratégia de particionamento e indexação para otimização de performance e custos.

### 4. Prof. Dr. Bill Gates (Computação em Nuvem)

**Posicionamento:** Arquitetura cloud-native bem planejada. Uso de AKS, Event Grid e SignalR apropriado para os requisitos.

**Contribuições:**
- Auto-scaling e elasticidade bem implementados
- Azure Front Door para CDN é escolha correta
- Disaster recovery multi-região atende SLAs bancários
- Sugestão: incluir análise de FinOps para controle de custos

**Sugestão para o trabalho:** Adicionar seção sobre otimização de custos cloud e governança financeira.

### 5. Prof. Dr. Nuvemvu Ada (DevOps)

**Posicionamento:** Pipeline CI/CD com blue-green deployment está alinhado com boas práticas. Zero-downtime deployment é crucial para ambiente bancário.

**Contribuições:**
- Infrastructure as Code (IaC) deve ser mencionado no trabalho
- Monitoramento com Application Insights bem estruturado
- Rollback automático é essencial para parâmetros críticos
- Falta detalhar estratégia de rollback granular por parâmetro

**Sugestão para o trabalho:** Incluir discussão sobre cultura DevOps e como IA auxiliou na automação de processos.

### 6. Prof. Dr. AgileScrum Master (Desenvolvimento Ágil)

**Posicionamento:** Abordagem iterativa de 6 fases está bem estruturada. Backward compatibility garante entrega de valor incremental.

**Contribuições:**
- Migração gradual permite feedback contínuo
- Quick wins demonstráveis importantes para adoção
- Suporte dedicado durante transição é fundamental
- Sugiro incluir métricas de velocidade de entrega

**Sugestão para o trabalho:** Expandir discussão sobre metodologias ágeis aplicadas na migração arquitetural.

### 7. Prof. Dr. Unity Testão (Testes de Software)

**Posicionamento:** Estratégia de testes deve cobrir cenários de falha e recovery. Testing em ambiente bancário requer rigor especial.

**Contribuições:**
- Testes de carga para 10,000 requests/segundo essenciais
- Testes de chaos engineering para resiliência
- Coverage mínimo de 80% é adequado
- Sugiro incluir testes de conformidade LGPD/SOX

**Sugestão para o trabalho:** Detalhar estratégia de testes automatizados e validação de SLAs.

### 8. Prof. Dr. Qualy Bão (Qualidade de Software)

**Posicionamento:** Métricas de qualidade bem definidas. SLAs de 2 minutos para parâmetros críticos são desafiadores mas factíveis.

**Contribuições:**
- Observabilidade com métricas de negócio importante
- Dashboards real-time para stakeholders
- KPIs de performance bem estruturados
- Falta definir métricas de experiência do usuário

**Sugestão para o trabalho:** Incluir framework de qualidade com métricas quantitativas e qualitativas.

### 9. Prof. Dr. Cascata Ágil (Gestão de Projetos)

**Posicionamento:** Roadmap de 18 meses para payback é realista. Gestão de riscos bem estruturada.

**Contribuições:**
- Fases do projeto bem definidas
- Milestones claros com critérios de aceite
- Budget de R$ 400.000 parece adequado
- Sugiro incluir análise de stakeholders e comunicação

**Sugestão para o trabalho:** Expandir análise de viabilidade econômica e cronograma detalhado.

### 10. Prof. Dr. Mudai Quieto (Gestão de Mudanças)

**Posicionamento:** Change management é crítico para sucesso. Resistência à migração deve ser gerenciada proativamente.

**Contribuições:**
- Treinamento intensivo durante transição
- Comunicação clara dos benefícios
- Champions em cada squad para adoção
- Documentação e runbooks essenciais

**Sugestão para o trabalho:** Incluir plano de gestão da mudança organizacional e cultural.

### 11. Prof. Dr. Avoado Nanuvem (Consultor Microsoft Azure)

**Posicionamento:** Arquitetura Azure muito bem estruturada. Uso otimizado dos serviços nativos da plataforma.

**Contribuições:**
- Azure Policy para governança
- Azure Cost Management para FinOps
- Azure Security Center para compliance
- Logic Apps para workflow de aprovação

**Sugestão para o trabalho:** Detalhar roadmap de adoção de novos serviços Azure e evolução da plataforma.

### 12. Prof. Dr. Vendeli Vros (Consultor AWS)

**Posicionamento:** Embora focado em Azure, reconheço que os padrões são aplicáveis em AWS. Arquitetura cloud-agnostic é positiva.

**Contribuições:**
- Princípios Well-Architected aplicáveis
- Comparação multi-cloud poderia enriquecer análise
- Estratégia de exit strategy importante
- Padrões de resiliência universais

**Sugestão para o trabalho:** Incluir breve análise comparativa com outras clouds para justificar escolha do Azure.

## Síntese da Coordenação

**Prof. Dr. Mandaporra Total:** Excelente discussão! Todos os pontos levantados são fundamentais para a qualidade do trabalho. Francisco, incorpore essas contribuições na primeira versão, mantendo foco na avaliação do DAS à luz das referências bibliográficas.

## Decisões e Próximos Passos

1. **Francisco** incorporará todas as sugestões na primeira versão do trabalho
2. Ênfase especial nos impactos da IA na concepção arquitetural
3. Cruzamento das referências bibliográficas com os padrões identificados no DAS
4. Segunda rodada de discussão após entrega da primeira versão

## Encerramento

**Prof. Dr. Mandaporra Total:** Reunião encerrada. Aguardamos a primeira versão do trabalho incorporando essas valiosas contribuições.

---

**Ata elaborada por:** Francisco Lima Figueiredo  
**Data:** 02 de agosto de 2025
