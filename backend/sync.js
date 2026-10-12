const conn = require('./db/conn')
const {Cliente, Carga, Encomenda} = require('./models/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas criadas e sincronizadas!')
    }catch(err){
        console.error('Erro ao sincronizar as tabelas!')
    }finally{
        await conn.close()
        console.log('Fechando conexão com BD!')
    }
}

syncDataBase()