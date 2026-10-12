const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

const clienteController = require('./controller/cliente.controller')
const cargaController = require('./controller/carga.controller')
const encomendaController = require('./controller/encomenda.controller')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

require('./models/rel')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// Rotas públicas: cadastro e login
app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

// Verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.status(200).json({message: 'Aplicação rodando!'})
})

// Rotas de clientes: exigem login
app.get('/clientes', authMiddleware, clienteController.listar)
app.get('/cliente/buscar/:nome', authMiddleware, clienteController.consultarPorNome)
app.get('/cliente/:id', authMiddleware, clienteController.consultarID)
app.put('/cliente/:id', authMiddleware, clienteController.atualizar)
app.delete('/cliente/:id', authMiddleware, clienteController.excluir)

// Rotas de cargas: exigem login
app.post('/carga', authMiddleware, cargaController.cadastrar)
app.get('/carga/buscar/:codigoRastreio', authMiddleware, cargaController.buscarPorRastreio)

// Rotas de encomendas: exigem login
app.post('/encomenda', authMiddleware, encomendaController.cadastrar)
app.get('/encomendas', authMiddleware, encomendaController.listar)
app.put('/encomenda/:id/status', authMiddleware, encomendaController.atualizarStatus)

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em ${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao se conectar com o banco de dados!', err)
    })
