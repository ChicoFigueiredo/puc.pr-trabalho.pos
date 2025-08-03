---
applyTo: 'estudo/**'
---
# Estrutura dos aquivos de estudo a serem gerados
A estrutura do trabalho deve seguir os tópicos abaixo, que foram definidas pela coordenação do curso de pós-graduação para a elaboração do trabalho em um arquivo word, e vamos adaptar para gerar conteúdo em Markdown. 
Ao ser solicitado, use a estrutura abaixo para organizar o conteúdo do seu trabalho.
O conteúdo deve ser escrito em português usando a norma culta, seguindo as normas da ABNT.
O conteúdo deve ser claro, objetivo e apresentar uma argumentação consistente.
O arquivo markdown gerado tem que ter a seguinte estutura:

## TÍTULO
- Deve ser em Fonte 14, caixa alta, negrito, alinhamento centralizado e máximo 12 palavras

## Nome do(a) estudante

A página deve ter formatação em “papel tamanho A4” (297 x 210 mm) e todas as margens de 3 cm. O texto deve ser digitado em Word for Windows, fonte Times New Roman ou Arial, 12, e espaçamento 1,5. Esse documento deve conter entre 6 e 10 páginas. Atenção: Não se esqueça de excluir todos esses textos de orientação (em itálico) antes de entregar seu arquivo final.

## SUMÁRIO EXECUTIVO
Resumo da visão geral do sistema. Desenvolva uma descrição geral do sistema, do ponto de vista do usuário. Máximo de 1 página.

## PROBLEMATIZAÇÃO
Contexto do problema que será analisado para propor uma solução arquitetônica alinhada às necessidades mapeadas. Analisar o contexto proposto, sempre levando em consideração a arquitetura atual, soluções em nuvem, armazenamento de dados e/ou questões de segurança da informação. Máximo de 1 página.

## JUSTIFICATIVA E OBJETIVO GERAL
Explicar a motivação para a intervenção do problema e sua importância e impacto para o negócio. Máximo de 2 páginas.

## FUNDAMENTAÇÃO TEÓRICA
Referências nas quais se baseia a proposta intervenção. Aqui, considerar as ferramentas que deverão ser utilizadas, frameworks, tecnologias e outros aspectos que julgar necessário. Máximo de 2 páginas.
- OBRIGATÓRIO constar ao final da fundamentação teórica o seguinte parágrafo: Durante a elaboração deste Trabalho de Conclusão de Curso, o autor utilizou, de forma auxiliar, as ferramentas de inteligência artificial ChatGPT (OpenAI, versão 4.0) e GitHub Copilot (Microsoft) com o objetivo de obter sugestões preliminares de estrutura textual, auxílio na revisão técnica de trechos e melhoria na clareza da comunicação escrita.
Após a utilização dessas ferramentas, todo o conteúdo foi integralmente revisado, adaptado e validado pelo autor, que assume total responsabilidade pela produção, originalidade, exatidão e adequação ética deste trabalho, conforme as diretrizes estabelecidas pela Resolução n.º 274/2024 – CONSUN da PUCPR.


## PERCURSO METODOLÓGICO DA INTERVENÇÃO
Detalhamento do plano de ação da intervenção proposta a partir do problema apresentado. Apresente sua solução para o problema, mas não se esqueça de analisar e apresentar os riscos inerentes à solução apresentada, para mitigar possível problemas futuros. Máximo de 3 páginas.

## RESULTADOS ESPERADOS
Descrição dos resultados frente ao percurso do plano de ação planejado. Meia página.

## REFERÊNCIAS
Deverão apresentar apenas as referências utilizadas no texto. As referências, com todos os dados da obra citada, devem seguir as normas da ABNT.


# Geração dos arquivos na pasta estudo/
- Com base no pedido feito pelo prompt do usuário, o conteúdo do trabalho deve ser gerado em arquivos Markdown (.md) e organizados na pasta `estudo/` do repositório.
- Deve ser gerado um único arquivo com o nome `v_999_trabalho-pos-puc-pr.md`, contendo todo o conteúdo do trabalho de pós-graduação, seguindo a estrutura definida acima, onde 999 é um número sequencial.
- A cada novo pedido, o número sequencial deve ser incrementado em 1, sendo gerado um novo arquivo e não alterando o arquivo anterior.
- Para cada novo arquivo gerado, deve ser mantida a mesma estrutura e formatação do arquivo anterior, garantindo a consistência do trabalho.
- Para cada novo arquivo, deve ser criado um novo arquivo de ata na pasta `estudo/atas/`, com o nome `ata_v_999_trabalho-pos-puc-pr.md`, onde 999 é o mesmo número sequencial do arquivo do trabalho, contendo todas as mudanças e sugestões coletadas na discussão.

# Geração do arquivo latex
- Caso seja pedido a conversão do conteúdo do trabalho para LaTeX, deve ser gerado um arquivo na pasta `latex/` com o nome `01_conteudo_latex.tex`.
- Deve ser gerado um arquivo LaTeX na pasta `latex/` com o nome `01_conteudo_latex.tex`, que deve conter o conteúdo do trabalho de pós-graduação formatado com a seguinte estrutura:
    - \chapter
    - \section
    - \subsection
- O arquivo LaTeX deve ser gerado com base no conteúdo do arquivo Markdown, seguindo a mesma estrutura e formatação.
- Demais elementos do latex, como \documentclass, \usepackage, \begin{document}, \end{document}, etc. não devem ser incluídos no arquivo, pois o arquivo será utilizado como parte de um projeto maior que já possui esses elementos.
- Não copiar a seção de bibliografia do arquivo markdown, pois ela já está no arquivo bibtex ./latex/bibliografia/!!!bibliografia.bib e deve ser referenciada no arquivo LaTeX.

# Diagramas mermaid
- Os diagramas mermaid devem ser gerados com a sintaxe correta, iniciando com `::: mermaid` e terminando com `:::` para delimitar o bloco de código.
- Os diagramas mermaid inseridos no markdown também tem que ser gravados no arquivo .mmd na pasta `estudo/mermaid/`, 1 arquivo para cada diagrama, com o nome `v_999_99_nome_do_diagrama.mmd`, onde `nome_do_diagrama` é o nome do diagrama em questão, v_999 faz referencia a versão do markdown e 99 o sequencial do diagrama no texto.
- Os agentes devem criar arquivos .svg para cada diagrama mermaid, usando ferramentas node.js para isso, com o nome `v_999_99_nome_do_diagrama.svg`, onde `nome_do_diagrama` é o nome do diagrama em questão, v_999 faz referencia a versão do markdown e 99 o sequencial do diagrama no texto.
- Os arquivos .svg devem ser gerados na pasta `estudo/mermaid/svg/`, seguindo a mesma estrutura de nomeação dos arquivos .mmd.
- No final, pode substituir no markdown o bloco de código do diagrama mermaid pela imagem SVG, usando a sintaxe `![nome_do_diagrama](./mermaid/svg/v_999_99_nome_do_diagrama.svg)`.