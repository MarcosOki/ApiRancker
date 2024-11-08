import {fastify} from 'fastify'
import { routes } from './routes'
import jwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

export const app = fastify()
app.register(jwt, {
    secret: 'secret'
})
app.register(fastifyCors, {
  origin: "*",  // Permite todas as origens (ideal para desenvolvimento)
  methods: ["GET", "POST", "PUT", "DELETE"],  // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"],  // Cabeçalhos permitidos
  credentials: true  // Permite o envio de cookies, caso necessário
});
app.register(routes)

app.listen({port:3000},()=>{
    console.log("Server is running on port 3000")
})
