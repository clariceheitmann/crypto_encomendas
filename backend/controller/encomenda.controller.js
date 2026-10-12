
const Encomenda = require('../models/Encomenda')
const Cliente = require('../models/Cliente')
const Carga = require('../models/Carga')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (
        !valores.idCliente ||
        !valores.idCarga ||
        !valores.statusAtual ||
        !valores.data
    ) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        })
    }

    const statusPermitidos = [
        'TRANSITO',
        'SAIU_ENTREGA',
        'ENTREGUE'
    ]

    if (!statusPermitidos.includes(valores.statusAtual)) {
        return res.status(400).json({
            message: 'Status inválido!'
        })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        const carga = await Carga.findByPk(valores.idCarga)

        if (!carga) {
            return res.status(404).json({
                message: 'Carga não encontrada!'
            })
        }

        if (Number(carga.idCliente) !== Number(valores.idCliente)) {
            return res.status(400).json({
                message: 'A carga não pertence ao cliente!'
            })
        }

        await Encomenda.create({
            idCliente: valores.idCliente,
            idCarga: valores.idCarga,
            statusAtual: valores.statusAtual,
            data: valores.data
        })

        return res.status(201).json({
            message: 'Encomenda cadastrada com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao cadastrar encomenda!', err)

        return res.status(500).json({
            message: 'Erro ao cadastrar encomenda!'
        })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Encomenda.findAll({
            order: [['data', 'ASC']]
        })

        return res.status(200).json(dados)

    } catch (err) {
        console.error('Erro ao listar encomendas!', err)

        return res.status(500).json({
            message: 'Erro ao listar encomendas!'
        })
    }
}

const atualizarStatus = async (req, res) => {
    const { id } = req.params
    const { statusAtual } = req.body

    const statusPermitidos = [
        'TRANSITO',
        'SAIU_ENTREGA',
        'ENTREGUE'
    ]

    if (!statusAtual || !statusPermitidos.includes(statusAtual)) {
        return res.status(400).json({
            message: 'Informe um status válido!'
        })
    }

    try {
        const encomenda = await Encomenda.findByPk(id)

        if (!encomenda) {
            return res.status(404).json({
                message: 'Encomenda não encontrada!'
            })
        }

        await encomenda.update({
            statusAtual,
            data: new Date()
        })

        return res.status(200).json({
            message: 'Status da encomenda atualizado com sucesso!',
            encomenda
        })

    } catch (err) {
        console.error('Erro ao atualizar status da encomenda!', err)

        return res.status(500).json({
            message: 'Erro ao atualizar status da encomenda!'
        })
    }
}

module.exports = {
    cadastrar,
    listar,
    atualizarStatus
}
