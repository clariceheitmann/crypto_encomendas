
const Cliente = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

// Cadastrar cliente
const cadastrar = async (req, res) => {
    const valores = req.body

    if (
        !valores.nome ||
        !valores.email ||
        !valores.senha ||
        !valores.cpf ||
        !valores.telefone
    ) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        })
    }

    if (!/^\d{11}$/.test(String(valores.cpf))) {
        return res.status(400).json({
            message: 'CPF inválido! Digite os 11 números.'
        })
    }

    try {
        const cpfCripto = cryptoJs.AES.encrypt(
            String(valores.cpf),
            CHAVE_SECRETA
        ).toString()

        const senhaCripto = cryptoJs.AES.encrypt(
            valores.senha,
            CHAVE_SECRETA
        ).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })

        return res.status(201).json({
            message: 'Cliente cadastrado com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao cadastrar cliente!', err)

        return res.status(500).json({
            message: 'Erro ao cadastrar cliente!'
        })
    }
}


// Listar clientes
const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()

        const resultado = clientes.map((cliente) => {
            const bytes = cryptoJs.AES.decrypt(
                cliente.cpf,
                CHAVE_SECRETA
            )

            const cpfDescriptografado = bytes.toString(
                cryptoJs.enc.Utf8
            )

            return {
                codCliente: cliente.codCliente,
                codigo_cliente: cliente.codCliente,
                nome: cliente.nome,
                email: cliente.email,
                cpf: cpfDescriptografado,
                telefone: cliente.telefone
            }
        })

        return res.status(200).json(resultado)

    } catch (err) {
        console.error('Erro ao listar clientes!', err)

        return res.status(500).json({
            message: 'Erro ao listar clientes!'
        })
    }
}


// Consultar cliente pelo ID
const consultarID = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        const bytes = cryptoJs.AES.decrypt(
            cliente.cpf,
            CHAVE_SECRETA
        )

        const cpfDescriptografado = bytes.toString(
            cryptoJs.enc.Utf8
        )

        return res.status(200).json({
            codCliente: cliente.codCliente,
            codigo_cliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            telefone: cliente.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar cliente pelo ID!', err)

        return res.status(500).json({
            message: 'Erro ao consultar cliente pelo ID!'
        })
    }
}


// Consultar cliente pelo nome
const consultarPorNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const cliente = await Cliente.findOne({
            where: { nome: nome }
        })

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        const bytes = cryptoJs.AES.decrypt(
            cliente.cpf,
            CHAVE_SECRETA
        )

        const cpfDescriptografado = bytes.toString(
            cryptoJs.enc.Utf8
        )

        return res.status(200).json({
            codCliente: cliente.codCliente,
            codigo_cliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            telefone: cliente.telefone
        })

    } catch (err) {
        console.error('Erro ao consultar cliente pelo nome!', err)

        return res.status(500).json({
            message: 'Erro ao consultar cliente pelo nome!'
        })
    }
}


// Atualizar cliente
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        const dadosAtualizados = {}

        if (valores.nome !== undefined) {
            dadosAtualizados.nome = valores.nome
        }

        if (valores.email !== undefined) {
            dadosAtualizados.email = valores.email
        }

        if (valores.telefone !== undefined) {
            dadosAtualizados.telefone = valores.telefone
        }

        if (valores.senha) {
            dadosAtualizados.senha = cryptoJs.AES.encrypt(
                valores.senha,
                CHAVE_SECRETA
            ).toString()
        }

        if (valores.cpf !== undefined) {
            if (!/^\d{11}$/.test(String(valores.cpf))) {
                return res.status(400).json({
                    message: 'CPF inválido! Digite os 11 números.'
                })
            }

            dadosAtualizados.cpf = cryptoJs.AES.encrypt(
                String(valores.cpf),
                CHAVE_SECRETA
            ).toString()
        }

        await Cliente.update(dadosAtualizados, {
            where: { codCliente: id }
        })

        return res.status(200).json({
            message: 'Cliente atualizado com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao atualizar cliente!', err)

        return res.status(500).json({
            message: 'Erro ao atualizar cliente!'
        })
    }
}


// Excluir cliente
const excluir = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        await Cliente.destroy({
            where: { codCliente: id }
        })

        return res.status(200).json({
            message: 'Cliente excluído com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao excluir cliente!', err)

        return res.status(500).json({
            message: 'Erro ao excluir cliente!'
        })
    }
}


module.exports = {
    cadastrar,
    listar,
    consultarID,
    consultarPorNome,
    atualizar,
    excluir
}
