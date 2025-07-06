const caixaParaDigitarNomeDaCidade = document.getElementById('caixaParaDigitarNomeDaCidade')
const listaDeSugestoes = document.getElementById('listaDeSugestoes')

const dataDaAtualiazacao = document.getElementById('data')
const localizacao = document.getElementById('local')
const descricao = document.getElementById('descricao')
const temperaturaMaxima = document.getElementById('tempmax')
const temperaturaMinima = document.getElementById('tempmin')


let timeout;
let diasDePrevisao = 6
let tempoDeResposta = 500
let opcao = 1

let mostrarInformacoesDaPrevisaoMeteorologica = (data) => {
    dataDaAtualiazacao.innerHTML = `Atualizado em ${data.atualizado_em}`
    localizacao.innerHTML = `${data.estado}, ${data.cidade}`
    temperaturaMaxima.innerHTML = `${data.clima[0].max}°C`
    temperaturaMinima.innerHTML = `${data.clima[0].min}°C`
    descricao.innerHTML = data.clima[0].condicao_desc
}

function limparListaDeSugestoes() {
    listaDeSugestoes.innerHTML = ''
}

const botoes = [
    document.getElementById('previsaoHoje'),
    document.getElementById('previsaoAmanha'),
    document.getElementById('previsaoProximosDias'),
    document.getElementById('previsaoHistorico')
]

function ativarBotao(botaoSelecionado) {
    botoes.forEach(botao => {
        if (botao === botaoSelecionado) {
            botao.style.backgroundColor = 'black'
            botao.style.color = 'white'
        } else {
            botao.style.backgroundColor = '#e9e9e9'
            botao.style.color = '#555555'
        }
    })
}

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        ativarBotao(botao)
    })
})

caixaParaDigitarNomeDaCidade.addEventListener('input', () => {
    clearTimeout(timeout)

    if (caixaParaDigitarNomeDaCidade.value == "") {
        limparListaDeSugestoes()
    }

    let nomeDaCidade = caixaParaDigitarNomeDaCidade.value

    timeout = setTimeout(async () => {
        let urlDaAPIBuscarLocalidades = `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeDaCidade}`

        try {
            const response = await fetch(urlDaAPIBuscarLocalidades);
            const data = await response.json();

            limparListaDeSugestoes()

            data.forEach(d => {
                let li = document.createElement('li')
                li.textContent = d.nome
                listaDeSugestoes.append(li)

                li.onclick = async () => {
                    let idDaCidade = d.id
                    caixaParaDigitarNomeDaCidade.value = d.nome
                    limparListaDeSugestoes()

                    let urlDaAPIPrevisaoMeteorologica = `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idDaCidade}/${diasDePrevisao}`

                    try {
                        const previsaoResponse = await fetch(urlDaAPIPrevisaoMeteorologica);
                        const previsaoData = await previsaoResponse.json();
                        console.log(previsaoData)
                        mostrarInformacoesDaPrevisaoMeteorologica(previsaoData);
                    }
                    catch (error) {
                        console.error('Erro ao buscar previsão meteorológica:', error);
                        alert('Não foi possível obter a previsão meteorológica.');
                    }
                }
            })
        } catch (error) {
            console.error('Erro ao buscar localidades', error)
        }
    }, tempoDeResposta)
})