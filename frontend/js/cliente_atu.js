const token = localStorage.getItem('token')

let res_atu_cliente = document.getElementById('res_atu_cliente')
let btn_atu = document.getElementById('btn_atu')

btn_atu.addEventListener('click', (e) =>{
    e.preventDefault()

    let codCliente = document.getElementById('codCliente').value
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    let cpf = document.getElementById('cpf').value
    let telefone = document.getElementById('telefone').value
    
    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        telefone: telefone
    }

    fetch(`http://localhost:3000/cliente/${codCliente}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(res =>{
        return res.json()
    })
    .then(dados =>{
        if(dados.message){
            res_atu_cliente.innerHTML = dados.message
        }else{
            res_atu_cliente.innerHTML = `Cliente atualizado com sucesso!`
        }
    })
    .catch((err)=>{
        console.error('Erro ao atualizar o cliente!',err)
        res_atu_cliente.innerHTML = `Erro ao atualizar o cliente!`
    })
})