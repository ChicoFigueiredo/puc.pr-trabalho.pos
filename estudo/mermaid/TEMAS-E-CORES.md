# Guia de Temas e Cores para SVGs Mermaid

## 🎨 Temas Disponíveis

O script `generate-svgs.js` agora suporta múltiplos temas de cores baseados nas opções nativas do `mermaid-cli`:

### 1. **Dark** (Padrão)
```bash
npm run generate          # Usa tema dark por padrão
npm run generate:dark     # Explicitamente dark
```
- **Características**: Fundo escuro, texto claro
- **Uso**: Apresentações, temas escuros
- **Cores**: Tons escuros com acentos coloridos

### 2. **Academic** (Recomendado para Trabalhos)
```bash
npm run generate:academic
npm run build:academic    # Limpa e gera com tema acadêmico
```
- **Características**: Tema profissional baseado em `neutral` com cores personalizadas
- **Uso**: **Trabalhos acadêmicos, dissertações, artigos**
- **Cores**: Azul profissional (#2563eb), tons neutros
- **Extras**: Maior resolução (1200x800), escala 2x para qualidade superior

### 3. **Forest** (Verde/Natural)
```bash
npm run generate:forest
```
- **Características**: Tons verdes e naturais
- **Uso**: Diagramas ecológicos, sustentabilidade
- **Cores**: Verde predominante

### 4. **Neutral** (Minimalista)
```bash
npm run generate:neutral
```
- **Características**: Tons neutros, minimalista
- **Uso**: Apresentações corporativas, relatórios
- **Cores**: Cinzas e tons neutros

### 5. **Default** (Azul Clássico)
```bash
npm run generate:default
```
- **Características**: Tema padrão do Mermaid
- **Uso**: Uso geral, documentação técnica
- **Cores**: Azul e branco clássicos

## 🔧 Configurações Técnicas

### Tema Academic (Personalizado)
O tema `academic` inclui configurações específicas para trabalhos acadêmicos:

```json
{
  "theme": "neutral",
  "themeVariables": {
    "primaryColor": "#2563eb",
    "primaryTextColor": "#1e40af",
    "primaryBorderColor": "#3b82f6",
    "lineColor": "#6b7280",
    "actorBkg": "#eff6ff",
    "actorBorder": "#2563eb",
    "actorTextColor": "#1e40af",
    "signalColor": "#374151",
    "labelBoxBkgColor": "#dbeafe",
    "noteTextColor": "#1f2937"
  }
}
```

### Parâmetros Adicionais
- **Resolução**: 1200x800 (tema academic)
- **Escala**: 2x (tema academic para maior qualidade)
- **Fundo**: Transparente (todos os temas)
- **Formato**: SVG vetorial

## 📊 Comparação de Temas

| Tema | Cor Principal | Fundo | Uso Recomendado | Qualidade |
|------|---------------|-------|-----------------|-----------|
| **academic** | Azul profissional | Transparente | **Trabalhos acadêmicos** | **Alta (2x)** |
| dark | Variado | Escuro | Apresentações | Normal |
| forest | Verde | Claro | Sustentabilidade | Normal |
| neutral | Cinza | Claro | Corporativo | Normal |
| default | Azul clássico | Branco | Geral | Normal |

## 🚀 Scripts Disponíveis

### Geração por Tema
```bash
npm run generate:academic    # Recomendado para trabalho
npm run generate:dark        # Tema escuro
npm run generate:forest      # Tema verde
npm run generate:neutral     # Tema minimalista
npm run generate:default     # Tema padrão
```

### Build Completo
```bash
npm run build               # Limpa e gera com tema padrão
npm run build:academic      # Limpa e gera com tema acadêmico
```

### Utilitários
```bash
npm run clean               # Remove todos os SVGs
node generate-svgs.js tema  # Execução direta com tema
```

## 💡 Recomendações de Uso

### Para Trabalho de Pós-Graduação
```bash
npm run build:academic
```
- ✅ Cores profissionais adequadas para ambiente acadêmico
- ✅ Alta resolução para impressão
- ✅ Contraste otimizado para leitura
- ✅ Padrão visual consistente

### Para Apresentações
```bash
npm run generate:dark    # Fundo escuro
npm run generate:neutral # Fundo claro minimalista
```

### Para Documentação Técnica
```bash
npm run generate:default
npm run generate:neutral
```

## 🔍 Exemplo de Uso

```bash
# Gerar SVGs com tema acadêmico para o trabalho
cd estudo/mermaid
npm run build:academic

# Verificar resultado
ls -la svg/
# v_004_01_criacao_parametro_critico.svg (tema acadêmico)
# v_004_02_cache_hierarquico.svg (tema acadêmico)
```

## 🎯 Resultado

Os SVGs gerados terão:
- **Tema visual consistente** com a escolha
- **Qualidade vetorial** escalável
- **Fundo transparente** para integração flexível
- **Cores otimizadas** para o contexto de uso
- **Resolução adequada** ao tipo de trabalho

**Recomendação**: Use `npm run build:academic` para o trabalho de pós-graduação para obter a melhor qualidade e adequação visual.
