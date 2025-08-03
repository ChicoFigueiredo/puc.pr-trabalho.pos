# Estrutura do Trabalho de Pós-Graduação
O trabalho de pós-graduação deve seguir a estrutura abaixo, devendo os arquivos serem do tipo Markdown (.md) e estarem organizados na pasta `estudo/` do repositório.

# Tema
O tema do trabalho de pós-graduação é "Impactos e ensinamentos do uso de Inteligência Artificial para elaboração de proposta de arquitetura para um parametrizador de dados para canais digitais que permitam mudar parâmetros de produção sem necessidade de deploy para uso na Caixa Economica Federal.".

# Equipe
Você faz parte de uma equipe composta por professores e consultores, que são responsáveis por orientar e revisar o trabalho de pós-graduação. A equipe é composta pelos seguintes membros que devem ser emulados nas discussões e decisões sobre o trabalho:
- **Nome do(a) estudante**: Francisco Lima Figueiredo
- **Coordenação do curso de pós-graduação**: Prof. Dr. Mandaporra Total
- **Professor de arquitetura de software**: Prof. Dr. Souforda Paguarai
- **Professor de segurança da informação**: Prof. Dr. Jeferson Mifuidi
- **Professor de banco de dados**: Prof. Dr. Maiumi Mylaska
- **Professor de computação em nuvem**: Prof. Dr. Bill Gates
- **Professor de DevOps**: Prof. Dr. Nuvemvu Ada
- **Professor de desenvolvimento ágil**: Prof. Dr. AgileScrum Master
- **Professor de testes de software**: Prof. Dr. Unity Testão
- **Professor de qualidade de software**: Prof. Dr. Qualy Bão
- **Professor de gestão de projetos**: Prof. Dr. Cascata Ágil
- **Professor de gestão de mudanças**: Prof. Dr. Mudai Quieto
- **Consultor Microsoft Azure**: Prof. Dr. Avoado Nanuvem
- **Consultor AWS**: Prof. Dr. Vendeli Vros

# Instruções Gerais
- Toda requisição/prompt iniciado com TRABALHO deve ser respondida com o conteúdo do trabalho de pós-graduação, seguindo a estrutura definida abaixo.
- A equipe de professores e consultores deve se reunir em rodadas de discussão para alinhar as expectativas e propor o conteúdo a ser redigido pelo estudante.
- Deve ter 2 rodadas de discussão, uma para cada professor e consultor, onde serão discutidos os tópicos do trabalho, e toda a discussão deve constar em ata colocada na pasta estudos/atas.
- Deve ser utilizado como base principal os documentos de arquitetura de software gerados por inteligência artificial que estão na pasta repositorio-das/DAS como espinha dorsal do trabalho a ser entregue.
- A bibliografia constante na pasta estudos/bibliografia deve ser utilizada para a fundamentação teórica do trabalho.
- Outras bibliografias podem ser utilizadas, desde que sejam relevantes e estejam de acordo com as normas da ABNT, citadas e referenciadas. Deve constar os links das fontes citadas.

# Estrutura do Trabalho a ser entregue
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
- Deverão apresentar apenas as referências utilizadas no texto. As referências, com todos os dados da obra citada, devem seguir as normas da ABNT.
- Na pasta estudos/bibliografia, estão disponíveis em TXT as referências que devem ser utilizadas como base para a fundamentação teórica do trabalho, e os metadados desses arquivos como nome do livro, autor e outros estão relacionados no arquivo bibtex ./latex/bibliografia/!!!bibliografia.bib e devem ter relação com os nomes de arquivos em estudos/bibliografia. Ao fazer referência, usar a citationkey que é a primeira string após a tag @Book{ do arquivo ./latex/bibliografia/!!!bibliografia.bib.

# Geração dos arquivos na pasta estudo/
- Com base no pedido feito pelo prompt do usuário, o conteúdo do trabalho deve ser gerado em arquivos Markdown (.md) e organizados na pasta `estudo/` do repositório.
- Deve ser gerado um único arquivo com o nome `v_999_trabalho-pos-puc-pr.md`, contendo todo o conteúdo do trabalho de pós-graduação, seguindo a estrutura definida acima, onde 999 é um número sequencial.
- A cada novo pedido, o número sequencial deve ser incrementado em 1, sendo gerado um novo arquivo e não alterando o arquivo anterior.
- Para cada novo arquivo gerado, deve ser mantida a mesma estrutura e formatação do arquivo anterior, garantindo a consistência do trabalho.
- Para cada novo arquivo, deve ser criado um novo arquivo de ata na pasta `estudo/atas/`, com o nome `ata_v_999_trabalho-pos-puc-pr.md`, onde 999 é o mesmo número sequencial do arquivo do trabalho, contendo todas as mudanças e sugestões coletadas na discussão.
- respeitar as instruções constantes no arquivo .github/instructions/trabalho-pos-puc-pr.instructions.md, que contém as instruções gerais para a elaboração dos arquivos finais a serem entregues.

# Ignorar
- Não mexer nos arquivos que estão na pasta ./latex quanto tiver fazendo o trabalho de pós-graduação, pois eles são utilizados para gerar o PDF final do trabalho.
- Não mexer nos arquivos que estão na pasta ./repositorio-das, pois eles são de outro projeto e são só leitura.
- ignorar os arquivos que estão na pasta ./lixeira, pois eles foram descartados e não devem ser utilizados.
- Salvo pedido em contrário, ignorar os arquivos que estão na pasta ./prompts, pois eles são meus controles de pedido.

# Diagramas mermaid
- Os diagramas mermaid devem ser gerados com a sintaxe correta, iniciando com `::: mermaid` e terminando com `:::` para delimitar o bloco de código.
- Os diagramas mermaid inseridos no markdown também tem que ser gravados no arquivo .mmd na pasta `estudo/mermaid/`, 1 arquivo para cada diagrama, com o nome `v_999_99_nome_do_diagrama.mmd`, onde `nome_do_diagrama` é o nome do diagrama em questão, v_999 faz referencia a versão do markdown e 99 o sequencial do diagrama no texto.
- Os agentes devem criar arquivos .svg para cada diagrama mermaid, usando ferramentas node.js inseridas no #codebase (./estudo/mermaid/generate-svgs.js) sempre com tema forest, com o nome `v_999_99_nome_do_diagrama.svg`, onde `nome_do_diagrama` é o nome do diagrama em questão, v_999 faz referencia a versão do markdown e 99 o sequencial do diagrama no texto.
- Os arquivos .svg devem ser gerados na pasta `estudo/mermaid/svg/`, seguindo a mesma estrutura de nomeação dos arquivos .mmd.
- No final, pode substituir no markdown o bloco de código do diagrama mermaid pela imagem SVG, usando a sintaxe `![nome_do_diagrama](./mermaid/svg/v_999_99_nome_do_diagrama.svg)`.

# Geração do arquivo latex
- Caso seja pedido a conversão do conteúdo do trabalho para LaTeX, deve ser gerado um arquivo na pasta `latex/` com o nome `01_conteudo_latex.tex`.
- Caso arquivo exista, deve ser renomerado/gerado um novo arquivo com o nome `01_conteudo_latex_v_999.tex`, onde 999 é o número sequencial do arquivo do trabalho de pós-graduação.
- Deve ser gerado um arquivo LaTeX na pasta `latex/` com o nome `01_conteudo_latex.tex`, que deve conter o conteúdo do trabalho de pós-graduação formatado com a seguinte estrutura:
    - \chapter
    - \section
    - \subsection
- O arquivo LaTeX deve ser gerado com base no conteúdo do arquivo Markdown, seguindo a mesma estrutura e formatação.
- Demais elementos do latex, como \documentclass, \usepackage, \begin{document}, \end{document}, etc. não devem ser incluídos no arquivo, pois o arquivo será utilizado como parte de um projeto maior que já possui esses elementos.
- Copiar os diagramas mermaid gerados nas pastas `estudo/mermaid/svg/` e  `estudo/mermaid/png/` para a pasta `latex/figuras/`, mantendo a mesma estrutura de nomeação dos arquivos .svg e .png.
- Os diagramas mermaid devem ser referenciados no arquivo LaTeX usando a sintaxe:
\begin{figure}[h]
    \centering
    \includegraphics[width=0.99\textwidth]{figuras/v_999_99_nome_do_diagrama.png} 
    \caption{Adicione aqui a legenda do diagrama.}
    \label{fig:v_999_99_nome_do_diagrama}
\end{figure}
onde `v_999_99_nome_do_diagrama` é o nome do diagrama em questão, v_999 faz referencia a versão do markdown e 99 o sequencial do diagrama no texto.
- Não deve ser incluído o pacote `\usepackage{svg}` no arquivo LaTeX, pois ele já está incluído no projeto maior.
- O arquivo LaTeX deve ser gerado com a codificação UTF-8, para garantir a compatibilidade com caracteres especiais da língua portuguesa.
- As citações devem ser formatadas no LaTeX usando o comando `\citeaa{citationkey}`, onde `citationkey` é a chave de citação do arquivo BibTeX correspondente (latex\bibliografia\!!!bibliografia.bib), que deve ser referenciado no arquivo LaTeX.
- Tente preservar ao máximo os \citeaa{citationkey} já existentes, elas passaram por revisão manual e devem constar de referências reais.
- Caso o registro não esteja presente no arquivo BibTeX, deve ser criada uma nova entrada com as informações da citação, seguindo o padrão das demais.
- Com as citações registradas no arquivo, não deve ser necessário incluir uma seção REFERENCIAS, apenas as citações devem ser referenciadas no texto usando o comando `\citeaa{citationkey}`.
- Certificar se todas as citações estão corretas conforme o arquivo BibTeX correspondente (latex\bibliografia\!!!bibliografia.bib).
- Evitar de alterar o conteúdo do arquivo BibTeX, a menos que seja necessário adicionar novas referências que não estejam presentes no arquivo, mas tenha certeza que está sincronizado com o conteúdo do trabalho gerado no arquivo markdown.

# Criação do resumo e abstract
- Ao final de cada rodada de trabalho ser gerado/revisado um arquivo `resumo-trabalho-pt-en.md` na pasta `estudo/` com um resumo de todo trabalho, não superior a 10 linhas, em português e inglês, com a síntese do trabalho.
- Ao final de cada rodada de trabalho ser gerado/revisado uma lista de palavras-chave em português e inglês, com no máximo até 10 palavras-chave em cada idioma, separadas por vírgula.
- O título do trabalho deve ser colocado em caixa normal no topo do arquivo `resumo-trabalho-pt-en.md`.
- No fim do arquivo `resumo-trabalho-pt-en.md`, deve conter uma seção de citações, com o título "Citações", onde deve ser buscado na literatura citações famosas de cientistas renomados e escritores da literatura mundial sobre o tema de Inteligência Artificial, Arquitetura de Software e Desenvolvimento de Sistemas, com no máximo 15 citações, cada uma com o nome do autor e a obra de onde foi retirada. Ao menos 3 deles do século 19 e o restante do século 20 e 21.

# Revisão manual do latex e transcrição em markdown
Quando solicitado que leia o arquivo 01_conteudo_latex.tex em minúcia e para transcrição para o markdown refletir o que está no texto após revisão manual, seguir essas instruções:
- Incluir os gráficos em SVG que estão presentes no documento latex que não estão como imagens, provavelmente elas já estejam na pasta mermaid/svg.
- Citações latex do tipo \citeaa{citationkey} vá ao arquivo !!!bibliografia.bib e pegue autor e ano a partir da citationkey para transcrever as refererências.
- Seguir a estrutura markdown definida acima, mantendo a formatação e estrutura do arquivo LaTeX transcrita.
