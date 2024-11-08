import { FastifyInstance } from "fastify";
import { routesUser } from "./routes/user.routes/@UserRoutes";
import { Test } from "./routes/test/test";

export const routes = async (app: FastifyInstance) =>{
    app.register(routesUser)
}