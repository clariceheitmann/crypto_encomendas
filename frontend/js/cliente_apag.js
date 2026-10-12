const token = localStorage.getItem('token')

let res_apag_cliente = document.getElementById('res_apag_cliente')
let btn_apag = document.getElementById('btn_apag')

btn_apag.addEventListener('click', (e) =>{
    e.preventDefault()

    let codCliente = document.getElementById('codCliente').value

    fetch(`http://localhost:3000/cliente/${codCliente}`,{
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
    })
    .then(res =>{
        return res.json()
    })
    .then(dados =>{
        res_apag_cliente.innerHTML = dados.message
    })
    .catch((err)=>{
        console.error('Erro ao excluir o cliente!',err)
        res_apag_cliente.innerHTML = `Erro ao excluir o cliente!`
    })
})