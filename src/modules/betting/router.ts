import Router from "koa-router"

import { HttpError } from "../error/classes/httpError"

import { validateSchema } from "../schema/middleware/validateSchema"

import { getUserToken } from "./actions/getUserToken"
import { updateUserBalance } from "./actions/updateUserBalance"

import { gamble } from "./helpers/gamble"
import { checkAmount } from "./helpers/checkAmount"

import betSchema from "./schemas/bet"

const router = new Router({ prefix: "/bet" })

type BettingBody = { id: string; token: string; amount: number }

router.post("/", validateSchema(betSchema, "body"), async (ctx, next) => {
    const { id, token, amount } = ctx.request.body as BettingBody

    const userToken = await getUserToken(id)
    if (!userToken) {
        throw new HttpError(404, "There seems to be no user with that id!")
    }

    if (userToken !== token) {
        throw new HttpError(401, "That doesn't seem to be the right token!")
    }

    const validAmount = await checkAmount(amount)(id)
    if (!validAmount) {
        throw new HttpError(400, "You don't seem to have enough money!")
    }

    const [dice, winAmount] = gamble(amount)
    const newBalance = await updateUserBalance(id)(winAmount)

    ctx.body = {
        rolled: dice,
        won: dice >= 50 ? true : false,
        amountWon: winAmount + amount,
        newBalance
    }
    console.log(`${id} gambled ${amount} with token ${token}`);
    

    await next()
})

export default router.routes()
