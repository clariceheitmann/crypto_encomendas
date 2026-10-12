
let res_login = document.getElementById('res_login')
let btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados => {
        res_login.textContent = dados.message || ''

        if (dados.token) {
            localStorage.setItem('token', dados.token)
            localStorage.setItem('nome', dados.nome)

            location.href = '../index.html'
        }
    })
    .catch(err => {
        console.error('Erro ao realizar o login!', err)
        res_login.textContent = 'Erro ao realizar o login!'
    })
})
