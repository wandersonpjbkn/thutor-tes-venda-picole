import mongoose from 'mongoose'
import config from './../_config'

// Conexão com o banco
mongoose.connect(config.db, { useNewUrlParser: true })

// Obtem os eventos que a conexão acima invocou
const db = mongoose.connection

// Lanca um alerta mediante o evento
db.on('error', console.error.bind(console, 'Erro na conexão:'))
db.on('open', () => console.log('Banco de dados conectado'))
