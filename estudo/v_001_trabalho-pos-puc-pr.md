# **IMPACTOS E ENSINAMENTOS DO USO DE INTELIGÊNCIA ARTIFICIAL PARA ELABORAÇÃO DE PROPOSTA DE ARQUITETURA PARA UM PARAMETRIZADOR DE DADOS PARA CANAIS DIGITAIS DA CAIXA ECONÔMICA FEDERAL**

Francisco Lima Figueiredo

---

## SUMÁRIO EXECUTIVO

O presente trabalho analisa os impactos e ensinamentos do uso de Inteligência Artificial (IA) na elaboração de uma proposta arquitetural para um sistema parametrizador de configurações dinâmicas destinado aos canais digitais da Caixa Econômica Federal. A pesquisa examina como ferramentas de IA auxiliaram na concepção de uma arquitetura event-driven baseada em Cosmos DB, Azure Event Grid e SignalR, substituindo o sistema atual baseado em Azure Blob Storage com polling.

A proposta arquitetural analisada prevê a migração de 43 APIs clientes para um sistema que atende SLAs críticos de 2 minutos para propagação de parâmetros, mantendo compliance bancário com LGPD, SOX e BCB 4658. A utilização de IA no processo de design arquitetural resultou na identificação e aplicação de padrões consolidados como CQRS, Event Sourcing e Circuit Breaker, fundamentados nas obras de Martin Fowler, Robert C. Martin e nas melhores práticas de computação em nuvem.

Os resultados demonstram que a IA pode atuar como catalisador na identificação de padrões arquiteturais complexos, acelerar o processo de tomada de decisão técnica e proporcionar maior aderência a princípios de qualidade de software, especialmente em sistemas críticos do setor bancário. O trabalho contribui para o entendimento de como ferramentas de IA podem ser integradas responsavelmente no processo de arquitetura de software corporativo.

---

## PROBLEMATIZAÇÃO

O sistema atual de parametrização da Caixa Econômica Federal, implementado sobre Azure Blob Storage com arquitetura baseada em polling, apresenta limitações estruturais que comprometem sua capacidade de atender aos crescentes requisitos de performance e compliance do ambiente bancário digital. Esta problemática se manifesta em múltiplas dimensões técnicas e organizacionais que demandam intervenção arquitetural.

A principal limitação técnica reside na impossibilidade de garantir SLAs críticos de propagação de parâmetros em menos de 2 minutos, requisito fundamental para operações bancárias que exigem resposta em tempo real. A arquitetura atual, dependente de polling periódico, introduz latências inerentes que variam entre 5 a 15 minutos, criando janelas de inconsistência que podem impactar negativamente a experiência do usuário e, em cenários críticos, comprometer a segurança operacional.

Do ponto de vista de compliance bancário, o sistema apresenta lacunas significativas na trilha de auditoria, versionamento de parâmetros e workflow de aprovação, elementos essenciais para atender regulamentações como LGPD, SOX e Resolução BCB 4658. A ausência de controles granulares de segregação de funções e a limitada capacidade de rastreabilidade de mudanças representam riscos operacionais e regulatórios para a instituição.

A escalabilidade constitui outro ponto crítico, uma vez que o overhead de polling cresce linearmente com o número de APIs clientes, atualmente 43 sistemas, com projeção de crescimento para mais de 1.000 APIs nos próximos anos. Esta limitação arquitetural compromete a estratégia de transformação digital da instituição e representa um gargalo tecnológico para novos produtos e serviços bancários.

---

## JUSTIFICATIVA E OBJETIVO GERAL

A elaboração desta proposta arquitetural justifica-se pela necessidade urgente de modernização tecnológica no setor bancário brasileiro, particularmente na Caixa Econômica Federal, onde sistemas legados convivem com demandas crescentes por agilidade, segurança e compliance regulatório. A parametrização dinâmica representa um componente crítico desta transformação, habilitando feature flags, A/B testing e configurações em tempo real que aceleram o time-to-market de produtos financeiros.

A escolha da Inteligência Artificial como ferramenta auxiliar no processo de concepção arquitetural fundamenta-se na complexidade inerente aos sistemas bancários, onde a intersecção entre requisitos funcionais, não-funcionais, restrições regulatórias e tecnológicas cria um espaço de problema multidimensional. As ferramentas de IA, especificamente ChatGPT e GitHub Copilot, demonstraram capacidade de processar simultaneamente múltiplas variáveis, identificar padrões arquiteturais consolidados e propor soluções que balanceiam trade-offs complexos.

O objetivo geral deste trabalho é avaliar criticamente como o uso de Inteligência Artificial impactou o processo de elaboração de uma proposta arquitetural para sistema parametrizador, analisando os ensinamentos obtidos à luz das referências teóricas consolidadas em arquitetura de software. Especificamente, busca-se compreender como a IA contribuiu para a identificação e aplicação de padrões arquiteturais descritos por Martin Fowler em "Padrões de Arquitetura de Aplicações Corporativas" e os princípios de design preconizados por Robert C. Martin em "Arquitetura Limpa".

A relevância empresarial desta investigação manifesta-se no potencial de ROI (Return on Investment) estimado em 18 meses, considerando-se a redução de custos operacionais, mitigação de riscos de compliance e aceleração de processos de desenvolvimento. A proposta prevê eliminação de 80% do overhead de polling desnecessário, implementação de controles automatizados de compliance e redução de 40% no tempo médio de troubleshooting, impactos diretos na eficiência operacional da instituição.

Do ponto de vista acadêmico, este trabalho contribui para o corpus de conhecimento emergente sobre aplicação responsável de IA em engenharia de software, oferecendo um estudo de caso real em ambiente de alta criticidade. A análise dos padrões identificados pela IA e sua correspondência com literatura clássica de arquitetura de software proporciona insights valiosos sobre o potencial e limitações das ferramentas atuais de IA generativa no contexto de arquitetura corporativa.

---

## FUNDAMENTAÇÃO TEÓRICA

A fundamentação teórica deste trabalho sustenta-se em três pilares conceituais interconectados: padrões de arquitetura de software, princípios de arquitetura limpa e paradigmas de computação em nuvem, todos analisados sob a perspectiva da aplicação auxiliar de ferramentas de Inteligência Artificial no processo de design arquitetural.

Martin Fowler, em "Padrões de Arquitetura de Aplicações Corporativas" (Fowler2008), estabelece fundamentos essenciais para sistemas empresariais complexos que se manifestam claramente na proposta arquitetural analisada. O padrão Command Query Responsibility Segregation (CQRS) identificado pela IA na separação entre Configuration Management API (write operations) e Configuration Distribution API (read operations) alinha-se diretamente com os princípios fowlerianos de otimização independente de operações de leitura e escrita. A aplicação do padrão Repository para abstração de acesso a dados, tanto no Cosmos DB quanto no Redis Cache, demonstra como a IA conseguiu identificar e aplicar abstrações consolidadas que promovem testabilidade e manutenibilidade.

O Event Sourcing, outro padrão central na proposta, reflete a aplicação dos conceitos fowlerianos para auditoria e rastreabilidade em sistemas corporativos. A implementação via Azure Event Grid e Cosmos DB Change Feed, sugerida pela análise com IA, materializa os princípios de captura de todas as mudanças como sequência imutável de eventos, essencial para compliance bancário e capacidade de replay de estados do sistema.

Robert C. Martin, em "Arquitetura Limpa" (Martin2019), preconiza os princípios SOLID e a inversão de dependências como fundamentos para arquiteturas sustentáveis. A proposta analisada demonstra aplicação destes princípios através da segregação de responsabilidades em microserviços especializados, onde cada componente possui uma razão única para mudança. O Configuration Management Service concentra-se exclusivamente em operações de escrita e workflow de aprovação, enquanto o Configuration Distribution Service otimiza-se para distribuição de alto volume. Esta separação, identificada e refinada com auxílio da IA, exemplifica o Single Responsibility Principle aplicado em nível arquitetural.

A inversão de dependências manifesta-se na proposta através da abstração das APIs clientes via SDK padronizado, que inverte a dependência direta dos sistemas consumidores em relação à implementação específica do parametrizador. Esta arquitetura, sugerida durante o processo auxiliado por IA, permite evolução independente dos componentes e facilita testes automatizados, princípios fundamentais da arquitetura limpa martiniana.

Em "Cloud Computing" (Ruparelia2016), são estabelecidos os paradigmas fundamentais de elasticidade, multi-tenancy e service-oriented architecture que fundamentam a proposta de migração para arquitetura cloud-native. A IA auxiliou na identificação de padrões específicos como Circuit Breaker e Bulkhead, essenciais para resiliência em ambientes distribuídos. O Circuit Breaker implementado no SDK garante degradação graceful quando o serviço de parametrização está indisponível, mantendo operação através de cache local e valores padrão.

O paradigma de Infrastructure as Code, presente nas obras sobre DevOps consultadas (Monteiro2021), manifesta-se na proposta através da automação completa de provisionamento via Azure Resource Manager Templates. A IA contribuiu para identificação de padrões de deployment blue-green e estratégias de rollback granular, essenciais para ambientes de alta disponibilidade bancária.

Pressman e Maxim, em "Engenharia de Software" (Pressman2021), estabelecem métricas de qualidade que se refletem na proposta através de KPIs específicos: coverage mínimo de 80% para testes automatizados, SLA de uptime de 99.95% e latência média inferior a 100ms para consultas em cache. A IA auxiliou na correlação entre requisitos não-funcionais e estratégias arquiteturais específicas, como o uso de CDN (Azure Front Door) para otimização de latência global.

A segurança da informação, fundamentada nos princípios de defesa em profundidade, materializa-se na proposta através de múltiplas camadas: network isolation via Private Endpoints, criptografia em trânsito e repouso, autenticação via SISET e autorização granular baseada em RBAC. A IA contribuiu para identificação de pontos de controle específicos para compliance com LGPD, incluindo classificação automática de dados pessoais e implementação de direito ao esquecimento.

Durante a elaboração deste Trabalho de Conclusão de Curso, o autor utilizou, de forma auxiliar, as ferramentas de inteligência artificial ChatGPT (OpenAI, versão 4.0) e GitHub Copilot (Microsoft) com o objetivo de obter sugestões preliminares de estrutura textual, auxílio na revisão técnica de trechos e melhoria na clareza da comunicação escrita. Após a utilização dessas ferramentas, todo o conteúdo foi integralmente revisado, adaptado e validado pelo autor, que assume total responsabilidade pela produção, originalidade, exatidão e adequação ética deste trabalho, conforme as diretrizes estabelecidas pela Resolução n.º 274/2024 – CONSUN da PUCPR.

---

## PERCURSO METODOLÓGICO DA INTERVENÇÃO

A metodologia de intervenção estrutura-se em seis fases sequenciais que garantem migração controlada e reversível do sistema atual para a arquitetura target proposta, minimizando riscos operacionais e maximizando aprendizado organizacional sobre aplicação de IA em arquitetura de software.

**Fase 1: Análise e Design Assistido por IA (2 meses)**
Esta fase inicial concentra-se na aplicação sistemática de ferramentas de IA para análise do sistema legado e elaboração da proposta arquitetural. O processo inicia-se com discovery automatizado do sistema atual, utilizando ChatGPT para análise de código-fonte existente e identificação de padrões arquiteturais implícitos. GitHub Copilot auxilia na geração de diagramas As-Is e documentação técnica detalhada.

A concepção da arquitetura target é conduzida através de sessões iterativas com IA, onde requisitos funcionais e não-funcionais são processados simultaneamente para identificar trade-offs e soluções otimizadas. Este processo revelou-se particularmente eficaz na identificação de padrões complexos como Event Sourcing e CQRS, que emergiram naturalmente da análise dos requisitos de auditoria e performance.

**Fase 2: Prova de Conceito (PoC) e Validação Técnica (3 meses)**
Desenvolvimento de PoC completa contemplando os componentes críticos da arquitetura proposta: Configuration Management API, Configuration Distribution API, integração com Cosmos DB e Redis, além do mecanismo de propagação via Event Grid e SignalR. A PoC utiliza subset representativo de 5 APIs clientes para validação de hipóteses arquiteturais.

Durante esta fase, ferramentas de IA são aplicadas para geração automatizada de testes de carga, cenários de falha e scripts de automação. GitHub Copilot acelera significativamente o desenvolvimento de mocks e stubs necessários para testes isolados de componentes. A validação inclui benchmarks de performance comparativa entre arquitetura atual e proposta.

**Fase 3: Implementação de Infraestrutura e Plataforma (2 meses)**
Provisionamento completo da infraestrutura Azure utilizando Infrastructure as Code (IaC) via Terraform e Azure Resource Manager Templates. Esta fase implementa todos os controles de segurança especificados: Private Endpoints, Azure Key Vault, network segmentation e configurações de compliance.

A configuração de observabilidade é estabelecida através de Application Insights, Azure Monitor e dashboards customizados em Power BI. Ferramentas de IA auxiliam na geração de queries de monitoramento e definição de alertas proativos baseados em padrões comportamentais identificados automaticamente.

**Fase 4: Migração Gradual e Testes de Aceitação (4 meses)**
Migração controlada das APIs clientes em waves de 10-15 sistemas por iteração, permitindo validação incremental e correção de issues antes da próxima wave. Cada wave inclui período de shadow mode onde ambos os sistemas operam paralelamente, possibilitando comparação de resultados e validação de consistência.

A estratégia de rollback granular permite reversão de APIs individuais sem impacto nos demais sistemas. Testes de aceitação automatizados, desenvolvidos com auxílio de IA, validam SLAs específicos para cada tipo de parâmetro (crítico, importante, normal) e cenários de falha.

**Fase 5: Otimização e Tuning (2 meses)**
Análise de performance em ambiente produtivo utilizando dados reais de telemetria. IA é aplicada para identificação de gargalos, otimização de queries Cosmos DB e fine-tuning de configurações de cache. Machine learning models são treinados para predição de padrões de uso e auto-scaling proativo.

Esta fase inclui otimização financeira (FinOps) através de análise automatizada de custos Azure e rightsizing de recursos. Relatórios de ROI são gerados automaticamente integrando métricas técnicas e financeiras.

**Fase 6: Estabilização e Transferência de Conhecimento (1 mês)**
Documentação completa da solução, runbooks operacionais e planos de disaster recovery. Treinamento intensivo das equipes de desenvolvimento e operações, incluindo sessions hands-on sobre troubleshooting e manutenção evolutiva.

Estabelecimento de Center of Excellence (CoE) para IA aplicada à arquitetura, documentando lições aprendidas e melhores práticas para futuros projetos. Métricas de sucesso são consolidadas e framework de melhoria contínua é implementado.

**Riscos Identificados e Estratégias de Mitigação**

O principal risco identificado relaciona-se à latência de propagação em cenários de pico de carga, mitigado através de implementação de CDN com cache pre-warming e circuit breakers com fallback para cache local. Testes de chaos engineering validam comportamento do sistema sob condições adversas.

Resistência organizacional à mudança representa risco médio, mitigado através de programa estruturado de change management incluindo quick wins demonstráveis, champions em cada squad e comunicação transparente de benefícios. Suporte dedicado 24x7 durante período de transição reduz ansiedade das equipes.

Complexidade operacional do novo sistema constitui risco médio, mitigado através de automação extensiva, runbooks detalhados e dashboards intuitivos. Investment em observabilidade permite detecção proativa de issues e reduz Mean Time to Resolution (MTTR).

Dependência excessiva de ferramentas de IA representa risco baixo mas crítico, mitigado através de validação humana sistemática de todas as decisões arquiteturais, documentação detalhada de rationales e treinamento das equipes nos princípios fundamentais subjacentes às soluções propostas pela IA.

---

## RESULTADOS ESPERADOS

A implementação da proposta arquitetural assistida por IA projeta resultados mensuráveis em múltiplas dimensões: técnica, operacional, financeira e organizacional, estabelecendo novo patamar de maturidade tecnológica para o ambiente de parametrização da Caixa Econômica Federal.

**Resultados Técnicos:** Atingimento dos SLAs críticos de propagação de parâmetros em menos de 2 minutos para 99% dos casos, representando melhoria superior a 600% em relação ao sistema atual. Redução da latência média de consulta para menos de 100ms através de arquitetura de cache multi-layer. Disponibilidade do sistema elevada para 99.95% com implementação de disaster recovery automático multi-região.

**Resultados Operacionais:** Eliminação de 80% do overhead de polling desnecessário, resultando em redução proporcional do tráfego de rede e carga nos sistemas clientes. Implementação de workflow automatizado de aprovação que reduz tempo médio de aprovação de parâmetros críticos de 2 horas para 15 minutos. Automação completa da trilha de auditoria com classificação automática de dados para compliance LGPD.

**Resultados Financeiros:** ROI positivo em 18 meses através da combinação de redução de custos operacionais e habilitação de novos produtos digitais. Otimização de custos de infraestrutura Azure através de auto-scaling inteligente e rightsizing automatizado. Mitigação de riscos de multas regulatórias através de controles automatizados de compliance.

**Resultados Organizacionais:** Estabelecimento de Center of Excellence para aplicação de IA em arquitetura de software, criando capacidade organizacional diferenciada. Aceleração de 40% no tempo médio de troubleshooting através de observabilidade aprimorada e runbooks automatizados. Redução de 60% em incidents relacionados a propagação de parâmetros através de monitoramento proativo e alertas inteligentes.

---

## REFERÊNCIAS

FOWLER, Martin. **Padrões de arquitetura de aplicações corporativas**. Porto Alegre: Bookman, 2008.

GALLOTTI, Giocondo Marino Antonio. **Arquitetura de software**. 2016.

MARTIN, Robert C. **Arquitetura Limpa**. São Paulo: Alta Books, 2019.

MONTEIRO, Eduarda Rodrigues et al. **DevOps**. Sagah, 2021.

NETTO, Eduardo Bráulio Wanderley. **Arquitetura de Computadores: a visão do software**. 2006.

PONTIFÍCIA UNIVERSIDADE CATÓLICA DO PARANÁ. **Resolução n.º 274/2024 – CONSUN: Diretrizes para uso da Inteligência Artificial – IA na PUCPR**. Aprovada ad referendum do CONSUN em 21 de agosto de 2024. Disponível em: https://www.scribd.com/document/767199033. Acesso em: 02 ago. 2025.

PRESSMAN, Roger S.; MAXIM, Bruce R. **Engenharia de software: A practitioner's approach**. 9th edition. New York: McGraw-Hill Education, 2021.

RUPARELIA, Nayan B. **Cloud Computing**. Cambridge: The MIT Press, 2016.
