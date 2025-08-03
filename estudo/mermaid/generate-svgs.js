#!/usr/bin/env node
/**
 * Script para gerar arquivos SVG a partir dos diagramas Mermaid (.mmd)
 * Este script automatiza a criação de SVGs usando @mermaid-js/mermaid-cli
 * 
 * Uso: node generate-svgs.js
 * 
 * O script:
 * 1. Procura todos os arquivos .mmd na pasta atual
 * 2. Gera arquivos .svg correspondentes na pasta svg/
 * 3. Usa tema escuro e fundo transparente para melhor integração
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const INPUT_DIR = './';
const OUTPUT_DIR = './svg/';

// Opções de tema disponíveis: 'default', 'forest', 'dark', 'neutral'
const THEME_OPTIONS = {
    default: 'default',     // Tema padrão azul/branco
    dark: 'dark',          // Tema escuro (atual)
    forest: 'forest',      // Tema verde/natural
    neutral: 'neutral',    // Tema neutro/minimalista
    academic: 'neutral'    // Alias para trabalhos acadêmicos
};

// Configuração atual (pode ser alterada via parâmetro)
const CURRENT_THEME = process.argv[2] || 'dark';
const THEME = THEME_OPTIONS[CURRENT_THEME] || 'dark';
const BACKGROUND = 'transparent';

// Configurações avançadas de cores para trabalhos acadêmicos
const MERMAID_CONFIG = {
    theme: THEME,
    themeVariables: {
        // Cores para temas acadêmicos profissionais
        primaryColor: CURRENT_THEME === 'academic' ? '#2563eb' : undefined,
        primaryTextColor: CURRENT_THEME === 'academic' ? '#1e40af' : undefined,
        primaryBorderColor: CURRENT_THEME === 'academic' ? '#3b82f6' : undefined,
        lineColor: CURRENT_THEME === 'academic' ? '#6b7280' : undefined,
        secondaryColor: CURRENT_THEME === 'academic' ? '#f1f5f9' : undefined,
        tertiaryColor: CURRENT_THEME === 'academic' ? '#e2e8f0' : undefined,
        // Cores específicas para sequence diagrams
        actorBkg: CURRENT_THEME === 'academic' ? '#eff6ff' : undefined,
        actorBorder: CURRENT_THEME === 'academic' ? '#2563eb' : undefined,
        actorTextColor: CURRENT_THEME === 'academic' ? '#1e40af' : undefined,
        actorLineColor: CURRENT_THEME === 'academic' ? '#6b7280' : undefined,
        signalColor: CURRENT_THEME === 'academic' ? '#374151' : undefined,
        signalTextColor: CURRENT_THEME === 'academic' ? '#1f2937' : undefined,
        labelBoxBkgColor: CURRENT_THEME === 'academic' ? '#dbeafe' : undefined,
        labelBoxBorderColor: CURRENT_THEME === 'academic' ? '#2563eb' : undefined,
        labelTextColor: CURRENT_THEME === 'academic' ? '#1e40af' : undefined,
        loopTextColor: CURRENT_THEME === 'academic' ? '#374151' : undefined,
        noteTextColor: CURRENT_THEME === 'academic' ? '#1f2937' : undefined,
        activationBorderColor: CURRENT_THEME === 'academic' ? '#2563eb' : undefined,
        activationBkgColor: CURRENT_THEME === 'academic' ? '#f0f9ff' : undefined
    }
};

console.log(`🔄 Iniciando geração de SVGs dos diagramas Mermaid...\n`);
console.log(`🎨 Tema selecionado: ${CURRENT_THEME} (${THEME})`);
console.log(`📋 Temas disponíveis: ${Object.keys(THEME_OPTIONS).join(', ')}`);
console.log(`💡 Uso: node generate-svgs.js [tema]\n`);

try {
    // Garantir que a pasta svg existe
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Pasta ${OUTPUT_DIR} criada.`);
    }

    // Criar arquivo de configuração temporário se necessário
    const configFile = path.join(INPUT_DIR, '.mermaid-config.json');
    if (CURRENT_THEME === 'academic' || Object.keys(MERMAID_CONFIG.themeVariables).some(key => MERMAID_CONFIG.themeVariables[key])) {
        fs.writeFileSync(configFile, JSON.stringify(MERMAID_CONFIG, null, 2));
        console.log(`📝 Configuração personalizada criada: ${configFile}`);
    }

    // Buscar todos os arquivos .mmd
    const mmdFiles = fs.readdirSync(INPUT_DIR)
        .filter(file => file.endsWith('.mmd'))
        .sort(); // Ordenar para processamento consistente

    if (mmdFiles.length === 0) {
        console.log('⚠️  Nenhum arquivo .mmd encontrado na pasta atual.');
        process.exit(0);
    }

    console.log(`📋 Arquivos .mmd encontrados: ${mmdFiles.length}`);
    mmdFiles.forEach(file => console.log(`   - ${file}`));
    console.log('');

    // Processar cada arquivo
    let successCount = 0;
    let errorCount = 0;

    for (const mmdFile of mmdFiles) {
        const inputPath = path.join(INPUT_DIR, mmdFile);
        const svgFileName = mmdFile.replace('.mmd', '.svg');
        const outputPath = path.join(OUTPUT_DIR, svgFileName);

        try {
            console.log(`🔧 Processando: ${mmdFile} → ${svgFileName}`);
            
            // Construir comando com configurações
            let command = `npx mmdc -i "${inputPath}" -o "${outputPath}" -t ${THEME} -b ${BACKGROUND}`;
            
            // Adicionar configuração personalizada se existir
            if (fs.existsSync(configFile)) {
                command += ` -c "${configFile}"`;
            }
            
            // Adicionar configurações de qualidade para trabalhos acadêmicos
            if (CURRENT_THEME === 'academic') {
                command += ` -w 1200 -H 800 -s 2`; // Maior resolução e escala
            }
            
            console.log(`   💻 Comando: ${command.replace(process.cwd(), '.')}`);
            
            // Executar comando (suprimir output para limpeza)
            execSync(command, { stdio: 'pipe' });
            
            // Verificar se o arquivo foi criado
            if (fs.existsSync(outputPath)) {
                const stats = fs.statSync(outputPath);
                console.log(`✅ Sucesso! Arquivo gerado: ${Math.round(stats.size / 1024)}KB`);
                successCount++;
            } else {
                throw new Error('Arquivo SVG não foi criado');
            }
            
        } catch (error) {
            console.error(`❌ Erro ao processar ${mmdFile}:`, error.message);
            errorCount++;
        }
        
        console.log(''); // Linha em branco para separação
    }

    // Relatório final
    console.log('📊 Relatório Final:');
    console.log(`   🎨 Tema usado: ${CURRENT_THEME} (${THEME})`);
    console.log(`   ✅ Sucessos: ${successCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`   📁 Arquivos SVG em: ${OUTPUT_DIR}`);
    
    // Limpar arquivo de configuração temporário
    if (fs.existsSync(configFile)) {
        fs.unlinkSync(configFile);
        console.log(`   🧹 Configuração temporária removida`);
    }
    
    if (errorCount === 0) {
        console.log('\n🎉 Todos os diagramas foram convertidos com sucesso!');
    } else {
        console.log('\n⚠️  Alguns diagramas apresentaram erros na conversão.');
        process.exit(1);
    }

} catch (error) {
    console.error('💥 Erro fatal:', error.message);
    process.exit(1);
}
