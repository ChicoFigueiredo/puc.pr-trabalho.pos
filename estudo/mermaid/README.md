# Gerador de Diagramas SVG - Trabalho de Pós-Graduação

Este diretório contém os diagramas Mermaid do trabalho de pós-graduação e as ferramentas para gerar arquivos SVG automaticamente.

## Estrutura de Arquivos

```
mermaid/
├── package.json                           # Configuração Node.js e scripts
├── generate-svgs.js                       # Script automatizado para gerar SVGs
├── README.md                              # Esta documentação
├── v_999_99_nome_do_diagrama.mmd         # Arquivos fonte Mermaid
└── svg/
    └── v_999_99_nome_do_diagrama.svg     # Arquivos SVG gerados
```

## Convenção de Nomenclatura

Os arquivos seguem o padrão definido nas instruções do trabalho:

- **Arquivos .mmd**: `v_999_99_nome_do_diagrama.mmd`
- **Arquivos .svg**: `v_999_99_nome_do_diagrama.svg`

Onde:
- `v_999`: Versão do markdown (ex: v_004)
- `99`: Sequencial do diagrama no texto (01, 02, etc.)
- `nome_do_diagrama`: Nome descritivo do diagrama

## Scripts Disponíveis

### Gerar todos os SVGs
```bash
npm run generate
```
Processa todos os arquivos .mmd e gera os SVGs correspondentes.

### Gerar um único SVG
```bash
npm run generate-single -- input.mmd -o svg/output.svg -t dark -b transparent
```

### Limpar arquivos SVG
```bash
npm run clean
```
Remove todos os arquivos SVG da pasta svg/.

### Build completo
```bash
npm run build
```
Limpa e regenera todos os SVGs.

## Configuração Técnica

Os SVGs são gerados com as seguintes configurações:
- **Tema**: Dark (melhor contraste)
- **Fundo**: Transparente (integração flexível)
- **Ferramenta**: @mermaid-js/mermaid-cli v11.9.0

## Diagramas Atuais (v_004)

### 01 - Criação de Parâmetro Crítico
- **Arquivo**: `v_004_01_criacao_parametro_critico.mmd`
- **Tipo**: Sequence Diagram
- **Descrição**: Fluxo de criação e aprovação de parâmetros críticos

### 02 - Cache Hierárquico
- **Arquivo**: `v_004_02_cache_hierarquico.mmd`
- **Tipo**: Sequence Diagram
- **Descrição**: Sistema de cache em múltiplas camadas com fallback

## Processo de Adição de Novos Diagramas

1. **Criar arquivo .mmd** seguindo a convenção de nomenclatura
2. **Executar geração**: `npm run generate`
3. **Verificar SVG** na pasta `svg/`
4. **Commitar ambos** os arquivos (.mmd e .svg)

## Manutenção

O script `generate-svgs.js` automaticamente:
- ✅ Detecta novos arquivos .mmd
- ✅ Cria a pasta svg/ se não existir
- ✅ Gera SVGs com configurações padronizadas
- ✅ Fornece relatório detalhado
- ✅ Valida se os arquivos foram criados corretamente

## Requisitos

- Node.js v16+ 
- npm (para instalar dependências)
- @mermaid-js/mermaid-cli (instalado automaticamente)

## Troubleshooting

### Erro "mmdc command not found"
```bash
npm install @mermaid-js/mermaid-cli
```

### Arquivo SVG não foi criado
Verifique a sintaxe do arquivo .mmd e execute individualmente:
```bash
npx mmdc -i arquivo.mmd -o svg/arquivo.svg
```

### Problemas de memória
Para diagramas muito complexos, pode ser necessário aumentar o limite de memória:
```bash
NODE_OPTIONS="--max_old_space_size=4096" npm run generate
```

## Controle de Versão (.gitignore)

O projeto inclui arquivos `.gitignore` configurados adequadamente:

### .gitignore local (estudo/mermaid/)
- `node_modules/` - Dependências Node.js (não versionar)
- `*.log` - Arquivos de log
- `.env*` - Variáveis de ambiente
- Arquivos temporários e cache

### .gitignore principal (raiz do projeto)
- Regras Node.js para toda a aplicação
- Arquivos temporários LaTeX
- Configurações de IDE
- Arquivos do sistema operacional

**Importante**: Os arquivos `.mmd` e `.svg` **SÃO versionados** pois são parte essencial do trabalho acadêmico.
