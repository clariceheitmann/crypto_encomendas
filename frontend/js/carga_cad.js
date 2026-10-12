const token = localStorage.getItem('token')

let res_cad_carga = document.getElementById('res_cad_carga')
let btn_cad = document.getElementById('btn_cad')

btn_cad.addEventListener('click', (e) =>{
    e.preventDefault()

    let idCliente = document.getElementById('idCliente').value
    let descricao = document.getElementById('descricao').value
    let peso = document.getElementById('peso').value
    let codigoRastreio = document.getElementById('codigoRastreio').value
    
    const valores = {
        idCliente: idCliente,
        descricao: descricao,
        peso: peso,
        codigoRastreio: codigoRastreio,
    }

    fetch(`http://localhost:3000/carga`,{
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
        res_cad_carga.innerHTML = `${dados.message}`
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar o carga!',err)
        res_cad_carga.innerHTML = `Erro ao cadastrar o carga!`
    })
})