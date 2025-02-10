const caixaParaDigitarNomeDaCidade = document.getElementById('caixaParaDigitarNomeDaCidade')
const listaDeSugestoes = document.getElementById('listaDeSugestoes')

let nomeDaCidade;
let idDaCidade;
let timeout;

caixaParaDigitarNomeDaCidade.addEventListener('input', () => {
    clearTimeout(timeout)

    let nomeDaCidade = caixaParaDigitarNomeDaCidade.value

    timeout = setTimeout(() => {
        let urlDaAPI = `https://brasilapi.com.br/api/cptec/v1/cidade/${nomeDaCidade}`

        fetch(urlDaAPI)
            .then(response => response.json())
            .then(data => {

                if(data){
                    listaDeSugestoes.innerHTML = ''
                    data.forEach(d => {
                        let li = document.createElement('li')
                        li.textContent = ''
                        li.textContent = d.nome
                        listaDeSugestoes.append(li)
                        li.onclick = ()=>{
                            idDaCidade = d.id
                            listaDeSugestoes.innerHTML = ''
                        }
                    });
                }
            }
            )
            .catch(error => console.error('Erro:', error))
    }, 1000)

})
