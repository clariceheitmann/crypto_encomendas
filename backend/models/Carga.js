const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCliente',
            model: 'clientes'
        }
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoRastreio: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'cargas'
})

module.exports = Carga