const caixaParaDigitarNomeDaCidade = document.getElementById('caixaParaDigitarNomeDaCidade')
const listaDeSugestoes = document.getElementById('listaDeSugestoes')

const dataDaAtualiazacao = document.getElementById('data')
const localizacao = document.getElementById('local')
const descricao = document.getElementById('descricao')
const temperaturaMaxima = document.getElementById('tempmax')
const temperaturaMinima = document.getElementById('tempmin')

let timeout;
let diasDePrevisao = 6
let tempoDeResposta = 1000

let mostrarInformacoesDaPrevisaoMeteorologica = (data) => {
    dataDaAtualiazacao.innerHTML = `Atualizado em ${data.atualizado_em}`
    localizacao.innerHTML = `${data.estado}, ${data.cidade}`
    temperaturaMaxima.innerHTML = `Dia ${data.clima[0].max}°C`
    temperaturaMinima.innerHTML = `Noite ${data.clima[0].min}°C`
    descricao.innerHTML = data.clima[0].condicao_desc
}

function limparListaDeSugestoes() {
    listaDeSugestoes.innerHTML = ''
}

caixaParaDigitarNomeDaCidade.addEventListener('input', () => {
    clearTimeout(timeout) // Utilizado para limpar o Timeout e q possa recomeçar o delay novamente.

    let nomeDaCidade = caixaParaDigitarNomeDaCidade.value

    timeout = setTimeout(() => { // Utilizado para dar um delay na sugestão quando o usuario pressionar uma tecla
        let urlDaAPIBuscarLocalidades = `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeDaCidade}`
        // Usado para pegar o ID de uma cidade para depois ser utilizado para pegar as informações do tempo dessa cidade
        fetch(urlDaAPIBuscarLocalidades)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    limparListaDeSugestoes()

                    data.forEach(d => {
                        let li = document.createElement('li')
                        li.textContent = d.nome
                        listaDeSugestoes.append(li)

                        li.onclick = () => {
                            let idDaCidade = d.id
                            caixaParaDigitarNomeDaCidade.value = d.nome
                            limparListaDeSugestoes()

                            let urlDaAPIPrevisaoMeteorologica = `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${idDaCidade}/${diasDePrevisao}`

                            fetch(urlDaAPIPrevisaoMeteorologica)
                                .then(response => response.json())
                                .then(mostrarInformacoesDaPrevisaoMeteorologica)
                                .catch(error => console.log('Error', error))
                        }
                    });
                }
            })
            .catch(error => console.error('Erro:', error))
    }, tempoDeResposta)
})