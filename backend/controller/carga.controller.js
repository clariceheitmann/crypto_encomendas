const Cliente = require('../models/Cliente')
const Carga = require('../models/Carga')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req, res) => {
    const valores = req.body

    if (!valores.idCliente || !valores.descricao ||
        !valores.peso || !valores.codigoRastreio) {
        return res.status(400).json({
            message: 'Preencha todos os campos!'
        })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        const codigoCriptografado = cryptoJs.AES.encrypt(
            valores.codigoRastreio,
            CHAVE_SECRETA
        ).toString()

        await Carga.create({
            idCliente: valores.idCliente,
            descricao: valores.descricao,
            peso: valores.peso,
            codigoRastreio: codigoCriptografado
        })

        return res.status(201).json({
            message: 'Carga cadastrada com sucesso!'
        })

    } catch (err) {
        console.error('Erro ao cadastrar carga!', err)

        return res.status(500).json({
            message: 'Erro ao cadastrar carga!'
        })
    }
}


const buscarPorRastreio = async(req, res) => {
    const codigoDigitado = req.params.codigoRastreio

    if(!codigoDigitado){
        return res.status(400).json({
            message: 'Informe o código de rastreio!'
        })
    }

    try{
        const cargas = await Carga.findAll()

        let cargaEncontrada = null

        for(let carga of cargas){
            const bytes = cryptoJs.AES.decrypt(
                carga.codigoRastreio,
                CHAVE_SECRETA
            )

            const codigoDescriptografado = bytes.toString(
                cryptoJs.enc.Utf8
            )

            if(codigoDescriptografado === codigoDigitado){
                cargaEncontrada = carga.toJSON()
                cargaEncontrada.codigoRastreio = codigoDescriptografado
                break
            }
        }

        if(!cargaEncontrada){
            return res.status(404).json({
                message: 'Carga não encontrada!'
            })
        }

        return res.status(200).json(cargaEncontrada)

    }catch(err){
        console.error('Erro ao buscar carga!', err)

        return res.status(500).json({
            message: 'Erro ao buscar carga!'
        })
    }
}


module.exports = {cadastrar, buscarPorRastreio}

