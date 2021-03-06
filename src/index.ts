import Koa from "koa"

import Router from "koa-router"

import bodyParser from "koa-bodyparser"
import logger from "koa-logger"

import { errorHandler } from "./modules/error/middleware/errorHandler"

import apiRouter from "./modules/apiRouter"

const app = new Koa()
const router = new Router()

const port = Number(process.env.PORT ?? 8090)

app.use(errorHandler())

router.use(apiRouter)

app.use(bodyParser())
if (process.env.NODE_ENV === "development") {
    app.use(logger())
}

app.use(router.routes()).use(router.allowedMethods())

const server = app.listen(port, () =>
    console.info(`Koa app started and listening on the port ${port}! 🚀`)
)
