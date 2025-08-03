# Guia de Temas e Cores para SVGs e PNGs 4K Mermaid

## 🎨 Temas Disponíveis

O script `generate-svgs.js` agora suporta múltiplos temas de cores e gera **ambos SVG e PNG em 4K** baseados nas opções nativas do `mermaid-cli`:

### 1. **Dark** (Padrão)
```bash
npm run generate          # Usa tema dark por padrão
npm run generate:dark     # Explicitamente dark
```

- **Características**: Fundo escuro, texto claro
- **Uso**: Apresentações, temas escuros
- **Cores**: Tons escuros com acentos coloridos
- **Saída**: SVG + PNG 4K (3840x2160)

### 2. **Academic** (Recomendado para Trabalhos)

```bash
npm run generate:academic
npm run build:academic    # Limpa e gera com tema acadêmico
```

- **Características**: Tema profissional baseado em `neutral` com cores personalizadas
- **Uso**: **Trabalhos acadêmicos, dissertações, artigos**
- **Cores**: Azul profissional (#2563eb), tons neutros
- **Extras**: Maior resolução (1200x800), escala 2x para qualidade superior
- **Saída**: SVG + PNG 4K (3840x2160, escala 4x)

### 3. **Forest** (Verde/Natural)

```bash
npm run generate:forest
```

- **Características**: Tons verdes e naturais
- **Uso**: Diagramas ecológicos, sustentabilidade
- **Cores**: Verde predominante
- **Saída**: SVG + PNG 4K (3840x2160)

### 4. **Neutral** (Minimalista)

```bash
npm run generate:neutral
```

- **Características**: Tons neutros, minimalista
- **Uso**: Apresentações corporativas, relatórios
- **Cores**: Cinzas e tons neutros
- **Saída**: SVG + PNG 4K (3840x2160)

### 5. **Default** (Azul Clássico)

```bash
npm run generate:default
```

- **Características**: Tema padrão do Mermaid
- **Uso**: Uso geral, documentação técnica
- **Cores**: Azul e branco clássicos
- **Saída**: SVG + PNG 4K (3840x2160)

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

- **Resolução SVG**: 1200x800 (tema academic)
- **Resolução PNG**: 3840x2160 (4K para todos os temas)
- **Escala SVG**: 2x (tema academic para maior qualidade)
- **Escala PNG**: 4x (todos os temas para qualidade 4K)
- **Fundo**: Transparente (todos os formatos e temas)
- **Formato**: SVG vetorial + PNG 4K bitmap

## 📊 Comparação de Temas

| Tema | Cor Principal | Fundo | Uso Recomendado | Qualidade SVG | Qualidade PNG |
|------|---------------|-------|-----------------|---------------|---------------|
| **academic** | Azul profissional | Transparente | **Trabalhos acadêmicos** | **Alta (2x)** | **4K (4x)** |
| dark | Variado | Escuro | Apresentações | Normal | **4K (4x)** |
| forest | Verde | Claro | Sustentabilidade | Normal | **4K (4x)** |
| neutral | Cinza | Claro | Corporativo | Normal | **4K (4x)** |
| default | Azul clássico | Branco | Geral | Normal | **4K (4x)** |

## 🚀 Scripts Disponíveis

### Geração por Tema

```bash
npm run generate:academic    # Recomendado para trabalho (SVG + PNG 4K)
npm run generate:dark        # Tema escuro (SVG + PNG 4K)
npm run generate:forest      # Tema verde (SVG + PNG 4K)
npm run generate:neutral     # Tema minimalista (SVG + PNG 4K)
npm run generate:default     # Tema padrão (SVG + PNG 4K)
```

### Build Completo

```bash
npm run build               # Limpa e gera com tema padrão (SVG + PNG 4K)
npm run build:academic      # Limpa e gera com tema acadêmico (SVG + PNG 4K)
```

### Utilitários

```bash
npm run clean               # Remove todos os SVGs e PNGs
npm run clean:svg           # Remove apenas SVGs
npm run clean:png           # Remove apenas PNGs
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
# Gerar SVGs e PNGs 4K com tema acadêmico para o trabalho
cd estudo/mermaid
npm run build:academic

# Verificar resultado
ls -la svg/    # SVGs otimizados
ls -la png/    # PNGs em 4K (3840x2160)
# v_004_01_criacao_parametro_critico.svg/.png (tema acadêmico)
# v_004_02_cache_hierarquico.svg/.png (tema acadêmico)
```

## 🎯 Resultado

Os diagramas gerados terão:

- **Tema visual consistente** com a escolha
- **Qualidade vetorial SVG** escalável para qualquer tamanho
- **Qualidade 4K PNG** (3840x2160) para impressão e apresentações de alta qualidade
- **Fundo transparente** para integração flexível
- **Cores otimizadas** para o contexto de uso
- **Duplo formato**: SVG para web/digital e PNG 4K para impressão/apresentação

**Recomendação**: Use `npm run build:academic` para o trabalho de pós-graduação para obter a melhor qualidade visual e adequação acadêmica em ambos os formatos (SVG + PNG 4K).
