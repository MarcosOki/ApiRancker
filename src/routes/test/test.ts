import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const Test = async (app: FastifyInstance) =>{
    app.get("/test", async (request: FastifyRequest, reply: FastifyReply) =>{
        try{
            await request.jwtVerify()
            return {"message":"logado", user: request.user.user.name}
        }catch(erro){
            return reply.status(400).send("ao logar+ erro")   
        }
    })
}