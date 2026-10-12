
const token = localStorage.getItem('token')

let res_cad_encomenda = document.getElementById('res_cad_encomenda')
let btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click', (e) => {
    e.preventDefault()

    let idCliente = document.getElementById('codCliente').value
    let idCarga = document.getElementById('codCarga').value
    let statusAtual = document.getElementById('statusAtual').value
    let data = document.getElementById('data').value

    const valores = {
        idCliente: idCliente,
        idCarga: idCarga,
        statusAtual: statusAtual,
        data: data
    }

    fetch('http://localhost:3000/encomenda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        res_cad_encomenda.innerHTML = dados.message
    })
    .catch(err => {
        console.error('Erro ao cadastrar encomenda!', err)
        res_cad_encomenda.innerHTML = 'Erro ao cadastrar encomenda!'
    })
})
