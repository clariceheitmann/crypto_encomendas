
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({
            message: 'Acesso negado! Faça o login.'
        })
    }

    try {
        const bytes = cryptoJs.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(cryptoJs.enc.Utf8)

        if (!dadosDescriptografados) {
            return res.status(401).json({
                message: 'Token inválido!'
            })
        }

        const payload = JSON.parse(dadosDescriptografados)

        if (
            !payload ||
            !Number.isInteger(payload.idCliente) ||
            payload.idCliente <= 0 ||
            typeof payload.nome !== 'string' ||
            typeof payload.tempoExpirar !== 'number' ||
            !Number.isFinite(payload.tempoExpirar)
        ) {
            return res.status(401).json({
                message: 'Token inválido!'
            })
        }

        if (Date.now() >= payload.tempoExpirar) {
            return res.status(401).json({
                message: 'Sessão expirada! Faça o login novamente.'
            })
        }

        req.usuario = payload

        next()

    } catch (err) {
        return res.status(401).json({
            message: 'Token inválido!'
        })
    }
}

module.exports = authMiddleware
