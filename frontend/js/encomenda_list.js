
const token = localStorage.getItem('token')

let res_list_encomenda = document.getElementById('res_list_encomenda')
let btn_list = document.getElementById('btn_list')

btn_list.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/encomendas', {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message) {
            res_list_encomenda.innerHTML = dados.message
            return
        }

        if (dados.length === 0) {
            res_list_encomenda.innerHTML = 'Nenhuma encomenda cadastrada.'
            return
        }

        let tabela = `
            <table>
                <tr>
                    <th>ID da Encomenda</th>
                    <th>ID do Cliente</th>
                    <th>ID da Carga</th>
                    <th>Status Atual</th>
                    <th>Data</th>
                </tr>
        `

        dados.forEach(encomenda => {
            tabela += `
                <tr>
                    <td>${encomenda.codEncomenda}</td>
                    <td>${encomenda.idCliente}</td>
                    <td>${encomenda.idCarga}</td>
                    <td>${encomenda.statusAtual}</td>
                    <td>${encomenda.data}</td>
                </tr>
            `
        })

        tabela += '</table>'

        res_list_encomenda.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar encomendas!', err)
        res_list_encomenda.innerHTML = 'Erro ao listar encomendas!'
    })
})
