
const token = localStorage.getItem('token')

let res_consult_cliente = document.getElementById('res_consult_cliente')
let btn_consult = document.getElementById('btn_consult')
let btn_consult_nome = document.getElementById('btn_consult_nome')

// Mostrar os dados do cliente
function mostrarCliente(dados) {
    if (dados.message) {
        res_consult_cliente.textContent = dados.message
        return
    }

    res_consult_cliente.innerHTML = `
        <table>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>

            <tr>
                <td>${dados.codCliente}</td>
                <td>${dados.nome}</td>
                <td>${dados.email}</td>
                <td>${dados.cpf}</td>
                <td>${dados.telefone}</td>
            </tr>
        </table>
    `
}

// Consultar por ID
btn_consult.addEventListener('click', (e) => {
    e.preventDefault()

    let codCliente = document.getElementById('codCliente').value

    if (!codCliente) {
        res_consult_cliente.textContent = 'Digite o ID do cliente!'
        return
    }

    fetch(`http://localhost:3000/cliente/${codCliente}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {
        mostrarCliente(dados)
    })
    .catch(err => {
        console.error('Erro ao consultar cliente!', err)
        res_consult_cliente.textContent = 'Erro ao consultar cliente!'
    })
})

// Consultar por nome
btn_consult_nome.addEventListener('click', (e) => {
    e.preventDefault()

    let nome = document.getElementById('nome').value.trim()

    if (!nome) {
        res_consult_cliente.textContent = 'Digite o nome do cliente!'
        return
    }

    fetch(`http://localhost:3000/cliente/buscar/${encodeURIComponent(nome)}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(res => res.json())
    .then(dados => {
        mostrarCliente(dados)
    })
    .catch(err => {
        console.error('Erro ao consultar cliente!', err)
        res_consult_cliente.textContent = 'Erro ao consultar cliente!'
    })
})
