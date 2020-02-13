import Router from "koa-router"

import { HttpError } from "../error/classes/httpError"

import { getUserToken } from "./actions/getUserToken"
import { updateUserBalance } from "./actions/updateUserBalance"

import { gamble } from "./helpers/gamble"
import { checkAmount } from "./helpers/checkAmount"

const router = new Router({ prefix: "/bet" })

router.post("/", async (ctx, next) => {
    const { id, token, amount } = ctx.body

    const userToken = await getUserToken(String(id))
    if (!userToken) {
        throw new HttpError(404, "There seems to be no user with that id!")
    }

    if (userToken !== token) {
        throw new HttpError(401, "That doesn't seem to be the right token!")
    }

    const validAmount = await checkAmount(Number(amount))(id)
    if (!validAmount) {
        throw new HttpError(400, "You don't seem to have enough money!")
    }

    const [dice, winAmount] = gamble(Number(amount))
    const newBalance = await updateUserBalance(id)(winAmount)

    ctx.body = {
        rolled: dice,
        won: dice >= 50 ? true : false,
        amountWon: winAmount + Number(amount),
        newBalance
    }

    await next()
})

export default router.routes()
