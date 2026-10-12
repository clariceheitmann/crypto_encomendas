const Cliente = require('./Cliente')
const Carga = require('./Carga')
const Encomenda = require('./Encomenda')

Cliente.hasMany(Carga,{
    foreignKey: 'idCliente',
    as: 'cargaCliente',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteCarga',
    allowNull: false
})

Cliente.hasMany(Encomenda,{
    foreignKey: 'idCliente',
    as: 'encomendaCliente',
    onDelete: 'CASCADE'
})

Encomenda.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteEncomenda',
    allowNull: false
})

Carga.hasMany(Encomenda,{
    foreignKey: 'idCarga',
    as: 'encomendaCarga',
    onDelete: 'CASCADE'
})

Encomenda.belongsTo(Carga,{
    foreignKey: 'idCarga',
    as: 'cargaEncomenda',
    allowNull: false
})

module.exports = {Cliente, Encomenda, Carga}