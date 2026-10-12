
let verificar_login = document.getElementById('verificar_login')

let token = localStorage.getItem('token')
let nome = localStorage.getItem('nome')

if (token) {
    verificar_login.innerHTML = `
        <span>Usuário: </span>
        <span id="nome_usuario"></span>
        <a href="#" id="btn_logout">Sair</a>
    `

    document.getElementById('nome_usuario').textContent = nome || 'Cliente'

    let btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.removeItem('token')
        localStorage.removeItem('nome')

        location.href = './html/login.html'
    })
} else {
    verificar_login.innerHTML = `
        <a href="./html/login.html">Login</a>
    `
}
