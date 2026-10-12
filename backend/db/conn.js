const sequelize = require('sequelize')

const db = new sequelize.Sequelize('db_logitrack', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db 