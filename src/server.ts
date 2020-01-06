import koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";

import mainRouter from "./routes/betRouter";

import errorHandler from "./middleware/errorHandler";

const app = new koa();
const router = new Router();

const port = process.env.PORT || 8080;

router.get("/", (ctx, next) => {
  ctx.body = "Hello.";
});

router.use("/user", mainRouter.routes());

app.use(errorHandler);
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.info(`Server started successfully at port ${port}`);
});
