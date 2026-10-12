
const token = localStorage.getItem('token')

let res_list_cliente = document.getElementById('res_list_cliente')
let btn_list = document.getElementById('btn_list')

btn_list.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/clientes', {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.message) {
            res_list_cliente.textContent = dados.message
            return
        }

        if (dados.length === 0) {
            res_list_cliente.textContent = 'Nenhum cliente cadastrado.'
            return
        }

        let tabela = `
            <table>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                </tr>
        `

        dados.forEach(cliente => {
            tabela += `
                <tr>
                    <td>${cliente.codigo_cliente}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                </tr>
            `
        })

        tabela += '</table>'
        res_list_cliente.innerHTML = tabela
    })
    .catch(err => {
        console.error('Erro ao listar clientes!', err)
        res_list_cliente.textContent = 'Erro ao listar clientes!'
    })
})
