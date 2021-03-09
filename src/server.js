const express = require('express')
const { resolve } = require('path')
const { promisify } = require('util')
const initMiddlewares = require('./middlewares')
const initControllers = require('./controllers')

const server = express()
const port = parseInt(process.env.PORT || '9000')
const publicDir = resolve('public')

async function bootstrap() {
    server.use(express.static(publicDir))
    server.use(await initControllers())
    server.use(await initMiddlewares())
    await promisify(server.listen.bind(server, port))()
    console.log(`> Started on port http://localhost:${port}`)
}

bootstrap().then(() => {
}).catch(() => {
})