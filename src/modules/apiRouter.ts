import Router from "koa-router"

import bettingRoutes from "./betting/router"

const apiRouter = new Router({ prefix: "/api" })

apiRouter.use(bettingRoutes)

export default apiRouter.routes()
