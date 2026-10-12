const token = localStorage.getItem('token')

let res_cad_cliente = document.getElementById('res_cad_cliente')
let btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click', (e) =>{
    e.preventDefault()

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

    fetch(`http://localhost:3000/cliente`,{
        method: 'POST',
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
        res_cad_cliente.innerHTML = `${dados.message}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o cliente!',err)
        res_cad_cliente.innerHTML = `Erro ao cadastrar o cliente!`
    })
})