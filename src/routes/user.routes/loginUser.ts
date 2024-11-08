import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface LoginUser{
    email: string,
    password: string
}
export const LoginUser = async (app: FastifyInstance) => {
    app.post("/login", async (request: FastifyRequest<{Body:LoginUser}>, reply: FastifyReply) => {
        const email = request.body.email
        const password = request.body.password
        if(!request.body.email || !request.body.password){
            return reply.status(400).send("email e senha obrigatorios")
        }
        try{
            //procura no bd
            const user = await prisma.user.findUnique({
                where: {
                    email:email,
                }
            })
            //verifica se retornou um user
            if(!user){
                return reply.status(400).send("Usuário não encontrado")
            }
            if(user.password == password){
                //gerar token
                const token = app.jwt.sign({user})
                const message = JSON.stringify({token})
                return reply.status(200).send(message)
            }else{
                return reply.status(400).send("Usuário não encontrado")
            }
        }catch(erro){
            return reply.status(400).send("erro ao logar \n ")
        }
    })
}