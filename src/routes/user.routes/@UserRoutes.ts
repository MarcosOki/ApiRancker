import { FastifyInstance } from "fastify"
import { CreateUser } from "./createUser"
import { LoginUser } from "./loginUser"


export const routesUser = async (app: FastifyInstance) => {
    app.register(CreateUser)
    app.register(LoginUser)
}