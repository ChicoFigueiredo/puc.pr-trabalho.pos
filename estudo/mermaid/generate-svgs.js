#!/usr/bin/env node
/**
 * Script para gerar arquivos SVG e PNG (4K) a partir dos diagramas Mermaid (.mmd)
 * Este script automatiza a criação de SVGs e PNGs usando @mermaid-js/mermaid-cli
 * 
 * Uso: node generate-svgs.js [tema]
 * 
 * O script:
 * 1. Procura todos os arquivos .mmd na pasta atual
 * 2. Gera arquivos .svg correspondentes na pasta svg/
 * 3. Gera arquivos .png em 4K correspondentes na pasta png/
 * 4. Usa tema escuro e fundo transparente para melhor integração
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const INPUT_DIR = './';
const SVG_OUTPUT_DIR = './svg/';
const PNG_OUTPUT_DIR = './png/';

// Configurações 4K para PNG
const PNG_4K_CONFIG = {
    width: 3840,    // 4K width
    height: 2160,   // 4K height
    scale: 4,       // Alta escala para qualidade superior
    quality: 100    // Qualidade máxima
};

// Opções de tema disponíveis: 'default', 'forest', 'dark', 'neutral'
const THEME_OPTIONS = {
    default: 'default',     // Tema padrão azul/branco
    dark: 'dark',          // Tema escuro (atual)
    forest: 'forest',      // Tema verde/natural
    neutral: 'neutral',    // Tema neutro/minimalista
    academic: 'neutral'    // Alias para trabalhos acadêmicos
};

// Configuração atual (pode ser alterada via parâmetro)
const CURRENT_THEME = process.argv[2] || 'forest';
const THEME = THEME_OPTIONS[CURRENT_THEME] || 'forest';
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

console.log(`🔄 Iniciando geração de SVGs e PNGs (4K) dos diagramas Mermaid...\n`);
console.log(`🎨 Tema selecionado: ${CURRENT_THEME} (${THEME})`);
console.log(`📋 Temas disponíveis: ${Object.keys(THEME_OPTIONS).join(', ')}`);
console.log(`�️  Configuração PNG 4K: ${PNG_4K_CONFIG.width}x${PNG_4K_CONFIG.height} (escala ${PNG_4K_CONFIG.scale}x)`);
console.log(`�💡 Uso: node generate-svgs.js [tema]\n`);

try {
    // Garantir que as pastas existem
    if (!fs.existsSync(SVG_OUTPUT_DIR)) {
        fs.mkdirSync(SVG_OUTPUT_DIR, { recursive: true });
        console.log(`📁 Pasta ${SVG_OUTPUT_DIR} criada.`);
    }
    
    if (!fs.existsSync(PNG_OUTPUT_DIR)) {
        fs.mkdirSync(PNG_OUTPUT_DIR, { recursive: true });
        console.log(`📁 Pasta ${PNG_OUTPUT_DIR} criada.`);
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
    let svgCount = 0;
    let pngCount = 0;

    for (const mmdFile of mmdFiles) {
        const inputPath = path.join(INPUT_DIR, mmdFile);
        const baseFileName = mmdFile.replace('.mmd', '');
        const svgFileName = baseFileName + '.svg';
        const pngFileName = baseFileName + '.png';
        const svgOutputPath = path.join(SVG_OUTPUT_DIR, svgFileName);
        const pngOutputPath = path.join(PNG_OUTPUT_DIR, pngFileName);

        console.log(`🔧 Processando: ${mmdFile}`);
        console.log(`   📄 SVG: ${svgFileName}`);
        console.log(`   🖼️  PNG: ${pngFileName} (4K)`);

        try {
            // =================== GERAR SVG ===================
            console.log(`   🎨 Gerando SVG...`);
            
            // Construir comando SVG com configurações
            let svgCommand = `npx mmdc -i "${inputPath}" -o "${svgOutputPath}" -t ${THEME} -b ${BACKGROUND}`;
            
            // Adicionar configuração personalizada se existir
            if (fs.existsSync(configFile)) {
                svgCommand += ` -c "${configFile}"`;
            }
            
            // Adicionar configurações de qualidade para trabalhos acadêmicos
            if (CURRENT_THEME === 'academic') {
                svgCommand += ` -w 1200 -H 800 -s 2`; // Maior resolução e escala
            }
            
            // Executar comando SVG
            execSync(svgCommand, { stdio: 'pipe' });
            
            // Verificar se o SVG foi criado
            if (fs.existsSync(svgOutputPath)) {
                const svgStats = fs.statSync(svgOutputPath);
                console.log(`   ✅ SVG criado: ${Math.round(svgStats.size / 1024)}KB`);
                svgCount++;
            } else {
                throw new Error('Arquivo SVG não foi criado');
            }

            // =================== GERAR PNG 4K ===================
            console.log(`   🖼️  Gerando PNG 4K...`);
            
            // Construir comando PNG 4K
            let pngCommand = `npx mmdc -i "${inputPath}" -o "${pngOutputPath}" -t ${THEME} -b ${BACKGROUND}`;
            
            // Adicionar configuração personalizada se existir
            if (fs.existsSync(configFile)) {
                pngCommand += ` -c "${configFile}"`;
            }
            
            // Configurações específicas para PNG 4K
            pngCommand += ` -w ${PNG_4K_CONFIG.width} -H ${PNG_4K_CONFIG.height} -s ${PNG_4K_CONFIG.scale}`;
            
            // Executar comando PNG
            execSync(pngCommand, { stdio: 'pipe' });
            
            // Verificar se o PNG foi criado
            if (fs.existsSync(pngOutputPath)) {
                const pngStats = fs.statSync(pngOutputPath);
                console.log(`   ✅ PNG 4K criado: ${Math.round(pngStats.size / 1024)}KB`);
                pngCount++;
            } else {
                throw new Error('Arquivo PNG não foi criado');
            }
            
            successCount++;
            
        } catch (error) {
            console.error(`❌ Erro ao processar ${mmdFile}:`, error.message);
            errorCount++;
        }
        
        console.log(''); // Linha em branco para separação
    }

    // Relatório final
    console.log('📊 Relatório Final:');
    console.log(`   🎨 Tema usado: ${CURRENT_THEME} (${THEME})`);
    console.log(`   ✅ Arquivos processados com sucesso: ${successCount}`);
    console.log(`   📄 SVGs gerados: ${svgCount}`);
    console.log(`   🖼️  PNGs 4K gerados: ${pngCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`   📁 Arquivos SVG em: ${SVG_OUTPUT_DIR}`);
    console.log(`   📁 Arquivos PNG 4K em: ${PNG_OUTPUT_DIR}`);
    
    // Limpar arquivo de configuração temporário
    if (fs.existsSync(configFile)) {
        fs.unlinkSync(configFile);
        console.log(`   🧹 Configuração temporária removida`);
    }
    
    if (errorCount === 0) {
        console.log('\n🎉 Todos os diagramas foram convertidos com sucesso para SVG e PNG 4K!');
    } else {
        console.log('\n⚠️  Alguns diagramas apresentaram erros na conversão.');
        process.exit(1);
    }

} catch (error) {
    console.error('💥 Erro fatal:', error.message);
    process.exit(1);
}
