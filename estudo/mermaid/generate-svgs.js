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
const THEME = 'dark';
const BACKGROUND = 'transparent';

console.log('🔄 Iniciando geração de SVGs dos diagramas Mermaid...\n');

try {
    // Garantir que a pasta svg existe
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Pasta ${OUTPUT_DIR} criada.`);
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
            
            // Comando para gerar SVG
            const command = `npx mmdc -i "${inputPath}" -o "${outputPath}" -t ${THEME} -b ${BACKGROUND}`;
            
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
    console.log(`   ✅ Sucessos: ${successCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`   📁 Arquivos SVG em: ${OUTPUT_DIR}`);
    
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
