# Previsão do Tempo com Sugestão de Cidades

Este projeto é uma aplicação web que permite ao usuário buscar previsões meteorológicas digitando o nome de uma cidade. O sistema sugere localidades correspondentes e exibe informações sobre o clima da região selecionada.

## Tecnologias Utilizadas
- **HTML** para estrutura da página
- **CSS** para estilização (caso aplicável)
- **JavaScript** para interatividade e consumo da API
- **BrasilAPI** para obtenção de dados meteorológicos

## Funcionalidades
- Sugestão automática de cidades conforme o usuário digita
- Busca de previsão do tempo para a cidade selecionada
- Exibição de informações meteorológicas, incluindo:
  - Data da última atualização
  - Localização (estado e cidade)
  - Temperatura máxima e mínima do dia
  - Descrição do clima

## Como Funciona
1. O usuário digita o nome de uma cidade na caixa de entrada.
2. Após um curto intervalo (500ms), o sistema faz uma requisição à API para buscar localidades correspondentes.
3. A lista de sugestões é preenchida com as cidades encontradas.
4. O usuário clica em uma cidade para selecionar.
5. O sistema busca a previsão do tempo para a cidade escolhida e exibe as informações na tela.

## APIs Utilizadas
1. **Busca de localidades**: `https://brasilapi.com.br/api/cptec/v1/cidade/{nomeDaCidade}`
2. **Previsão meteorológica**: `https://brasilapi.com.br/api/cptec/v1/clima/previsao/{idDaCidade}/{diasDePrevisao}`

## Como Executar
1. Baixe ou clone este repositório.
2. Abra o arquivo principal em um navegador (necessário ambiente com servidor local para evitar problemas de CORS, se aplicável).
3. Digite o nome da cidade desejada e visualize as previsões.

## Melhorias Futuras
- Implementar tratamento de erros mais detalhado
- Melhorar a interface gráfica com CSS
- Adicionar suporte para previsões meteorológicas mais detalhadas

---
Desenvolvido por [Seu Nome]

