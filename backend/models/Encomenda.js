const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Encomenda = db.define('encomenda',{
    codEncomenda:{
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
    idCarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCarga',
            model: 'cargas'
        }
    },
    statusAtual: {
        type: DataTypes.ENUM('TRANSITO', 'SAIU_ENTREGA', 'ENTREGUE'),
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'encomendas'
})

module.exports = Encomenda