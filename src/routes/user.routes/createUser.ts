import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface createUser{
    name: string,
    email: string,
    password: string
}
export const CreateUser = async (app: FastifyInstance) =>{
    app.post("/createuser", async (request: FastifyRequest<{Body:createUser}>, reply: FastifyReply) =>{
        try{
        const user = await prisma.user.create({
            data: {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password
            }}).then((user) => {return user})
            const token = app.jwt.sign(user)
        return reply.status(200).send(token)
        }catch(erro){
            return reply.status(400).send("erro ao criar usuário \n " + erro)   
        }   
        
    })
}