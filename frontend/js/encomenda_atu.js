
const token = localStorage.getItem('token')

let res_atu_encomenda = document.getElementById('res_atu_encomenda')
let btn_atu = document.getElementById('btn_atu')

btn_atu.addEventListener('click', (e) => {
    e.preventDefault()

    let codEncomenda = document.getElementById('codEncomenda').value
    let statusAtual = document.getElementById('statusAtual').value

    const valores = {
        statusAtual: statusAtual
    }

    fetch(`http://localhost:3000/encomenda/${codEncomenda}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res => {
        return res.json()
    })
    .then(dados => {
        if (dados.message) {
            res_atu_encomenda.innerHTML = dados.message
        } else {
            res_atu_encomenda.innerHTML = 'Encomenda atualizada com sucesso!'
        }
    })
    .catch((err) => {
        console.error('Erro ao atualizar a encomenda!', err)
        res_atu_encomenda.innerHTML = 'Erro ao atualizar a encomenda!'
    })
})
