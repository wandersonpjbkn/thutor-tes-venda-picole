import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import config from './_config'
import routerIcePops from './components/ice-pops/routes'
import './_db'

const server = express()

// Middleware para habilitar cross-domain request
server.use(cors())

// Middleware para converter requisição em JSON
server.use(express.json())

// Middleware para lançar log
server.use(logger('dev'))

// Set routes
server.use('/ice-pops', routerIcePops)

// Lida com rotas que não batem
server.use((req, res, next) => {
  res
    .status(404)
    .send({
      message: 'Requisição inválida'
    })
})

// Servidor em execução
server.listen(config.serverPort, () => {
  console.log(`Servidor executando na porta: ${config.serverPort}`)
})
