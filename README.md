# Trabalho de Pós-Graduação PUC-PR

## 📋 Sobre o Projeto

**Título**: Impactos e ensinamentos do uso de Inteligência Artificial para elaboração de proposta de arquitetura para um parametrizador de dados para canais digitais que permitam mudar parâmetros de produção sem necessidade de deploy para uso na Caixa Econômica Federal.

**Autor**: Francisco Lima Figueiredo  
**Curso**: Pós-Graduação em Arquitetura de Software, Ciência de Dados e Cybersecurity  
**Instituição**: Pontifícia Universidade Católica do Paraná (PUC-PR)  
**Ano**: 2025

## 🎯 Objetivos

### Objetivo Geral
Analisar os impactos, benefícios e limitações do uso de Inteligência Artificial na elaboração de propostas arquiteturais para sistemas bancários críticos, utilizando como caso de estudo um sistema parametrizador de dados para canais digitais da Caixa Econômica Federal.

### Objetivos Específicos
- Avaliar a adequação técnica da arquitetura produzida por IA aos princípios de Arquitetura Limpa
- Analisar a conformidade com requisitos regulatórios do setor bancário brasileiro
- Identificar pontos fortes e limitações do uso de IA no processo de design arquitetural
- Estabelecer metodologia para validação crítica de arquiteturas produzidas por IA
- Propor diretrizes para utilização eficaz de IA em projetos arquiteturais empresariais

## 🏗️ Estrutura do Repositório

```
📁 puc.pr-trabalho.pos/
├── 📁 .github/                          # Configurações GitHub e instruções
│   ├── 📁 instructions/                 # Instruções para desenvolvimento
│   └── 📄 copilot-instructions.md       # Diretrizes para GitHub Copilot
├── 📁 estudo/                           # Documentos do trabalho acadêmico
│   ├── 📁 anexos/                       # Anexos técnicos e DAS
│   │   ├── 📄 DAS_Parametrizador.md     # Documento de Arquitetura Software (65 páginas)
│   │   ├── 📁 ADRs/                     # Architecture Decision Records
│   │   ├── 📁 Compliance/               # Documentos de conformidade regulatória
│   │   ├── 📁 Diagramas/                # Diagramas C4 e técnicos
│   │   └── 📁 DevOps/                   # Pipelines e automação
│   ├── 📁 atas/                         # Atas de reuniões e decisões
│   ├── 📁 bibliografia/                 # Referências bibliográficas em TXT
│   ├── 📁 mermaid/                      # Diagramas Mermaid
│   │   ├── 📁 svg/                      # Diagramas em formato SVG
│   │   └── 📁 png/                      # Diagramas em formato PNG 4K
│   ├── 📄 resumo-trabalho-pt-en.md      # Resumo em português e inglês
│   └── 📄 v_XXX_trabalho-pos-puc-pr.md # Versões do trabalho (v001-v008)
├── 📁 latex/                            # Projeto LaTeX para geração PDF
│   ├── 📄 01_conteudo_latex.tex         # Conteúdo principal em LaTeX
│   ├── 📁 bibliografia/                 # Bibliografia BibTeX
│   ├── 📁 figuras/                      # Imagens e diagramas
│   └── 📁 modulos/                      # Estilos e templates LaTeX
├── 📁 prompts/                          # Prompts e revisões utilizados
└── 📁 repositorio-das/                  # DAS original de referência
    └── 📁 DAS/Parametrizador/           # Documentação arquitetural base
```

## 🤖 Metodologia com Inteligência Artificial

### Ferramentas Utilizadas
- **ChatGPT 4.0** (OpenAI): Geração de documentação técnica e arquitetural
- **GitHub Copilot** (Microsoft): Assistência na elaboração de código e diagramas

### Processo de Elaboração do DAS
1. **Sessão 1 - Conceituação e Requisitos (2h)**: Definição de requisitos funcionais e não-funcionais
2. **Sessão 2 - Design Arquitetural (3h)**: Elaboração da arquitetura técnica com microserviços Azure
3. **Sessão 3 - Implementação e Operação (2h)**: Desenvolvimento de pipelines CI/CD e estratégias de deployment

### Framework de Avaliação Crítica
- **Adequação Técnica**: Conformidade com padrões arquiteturais
- **Completude**: Cobertura de aspectos essenciais para sistema bancário
- **Viabilidade**: Factibilidade de implementação
- **Conformidade**: Aderência a regulamentações brasileiras
- **Inovação**: Presença de soluções criativas

## 📚 Fundamentação Teórica

### Principais Referências
- **Robert C. Martin** - Arquitetura Limpa (Clean Architecture)
- **Martin Fowler** - Padrões de Arquitetura de Aplicações Corporativas
- **Roger S. Pressman & Bruce R. Maxim** - Engenharia de Software
- **Nayan B. Ruparelia** - Cloud Computing
- **Resolução CMN 4.893/2021** - Segurança Cibernética e Computação em Nuvem

### Tecnologias Abordadas
- **Cloud Computing**: Microsoft Azure, Microserviços
- **Padrões Arquiteturais**: Event Sourcing, CQRS, Circuit Breaker
- **DevOps**: CI/CD, Infrastructure as Code, Monitoring
- **Compliance**: LGPD, SOX, Regulamentações Bancárias

## 🔍 Principais Artefatos Produzidos

### Document Architecture Software (DAS)
- **DAS_Parametrizador.md**: Especificação arquitetural completa (65 páginas)
- **ADRs**: 6 Architecture Decision Records documentando decisões técnicas
- **Diagramas C4**: Context, Container e Component diagrams
- **Compliance Matrix**: Mapeamento de conformidade regulatória

### Diagramas Técnicos
- 📊 **15+ diagramas Mermaid** convertidos para SVG e PNG 4K
- 🏗️ **Arquitetura em camadas** com separação de responsabilidades
- 🔄 **Diagramas de sequência** para fluxos críticos
- 📋 **Tabelas comparativas** de tecnologias e padrões

## 🚀 Como Executar

### Pré-requisitos
- LaTeX (TeX Live, MiKTeX ou similar)
- Node.js (para geração de diagramas Mermaid)
- Git LFS (para arquivos binários grandes)

### Compilação do PDF
```bash
cd latex/
pdflatex 001-Artigo-Francisco.Lima.Figueiredo-espg.tex
bibtex 001-Artigo-Francisco.Lima.Figueiredo-espg
pdflatex 001-Artigo-Francisco.Lima.Figueiredo-espg.tex
pdflatex 001-Artigo-Francisco.Lima.Figueiredo-espg.tex
```

### Geração de Diagramas
```bash
cd estudo/mermaid/
node generate-svgs.js  # Gera SVGs dos diagramas Mermaid
```

## 📈 Resultados e Contribuições

### Impactos Positivos da IA
- ✅ Agilidade na formulação de alternativas arquiteturais
- ✅ Consistência entre artefatos técnicos
- ✅ Aplicação automática de best practices
- ✅ Detecção precoce de lacunas argumentativas

### Limitações Identificadas
- ⚠️ Padrões genéricos sem considerar contexto específico
- ⚠️ Necessidade de validação técnica constante
- ⚠️ Limitações em inovação arquitetural
- ⚠️ Dependência de conhecimento técnico do autor

## 📋 Status do Projeto

- [x] Elaboração do DAS com IA (100%)
- [x] Análise crítica da arquitetura (100%)
- [x] Documentação técnica completa (100%)
- [x] Conversão para LaTeX (100%)
- [x] Geração de diagramas SVG/PNG (100%)
- [x] Revisão bibliográfica (100%)
- [x] Validação de conformidade (100%)

## 🤝 Conformidade Ética

Este trabalho foi desenvolvido seguindo as diretrizes da **Resolução n.º 274/2024 – CONSUN da PUCPR** para uso de Inteligência Artificial. Todo conteúdo gerado por IA foi integralmente revisado, adaptado e validado pelo autor, que assume total responsabilidade pela produção, originalidade e adequação ética deste trabalho.

## 📄 Licença

Este projeto é parte de um trabalho acadêmico para fins educacionais. Todos os direitos reservados ao autor.

## 🔗 Links Úteis

- **📄 PDF Final do Trabalho**: [Projeto.Aplicação.3112024005764-Francisco.Figueiredo-2.pdf](./latex/zz.pdf/!Projeto.Aplicação.3112024005764-Francisco.Figueiredo-2.pdf)
- **Repositório GitHub**: [puc.pr-trabalho.pos](https://github.com/ChicoFigueiredo/puc.pr-trabalho.pos)
- **DAS Principal**: [DAS_Parametrizador.md](./estudo/anexos/DAS_Parametrizador.md)
- **Resumo do Trabalho**: [resumo-trabalho-pt-en.md](./estudo/resumo-trabalho-pt-en.md)

---

**Desenvolvido por Francisco Lima Figueiredo**  
*Pós-Graduação em Arquitetura de Software, Ciência de Dados e Cybersecurity - PUC-PR*  
*2025*
