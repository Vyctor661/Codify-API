import Koa from "koa"

import Router from "koa-router"

import logger from "koa-logger"

import { errorHandler } from "./modules/error/middleware/errorHandler"

import mainRouter from "./routes/betRouter"

const app = new Koa()
const router = new Router()

const port = Number(process.env.PORT ?? 8080)

app.use(errorHandler())

router.get("/", (ctx, next) => {
    ctx.body = "Hello."
})

router.use("/user", mainRouter.routes())

app.use(logger())

app.use(router.routes()).use(router.allowedMethods())

const server = app.listen(port, () =>
    console.info(`Koa app started and listening on the port ${port}! 🚀`)
)
