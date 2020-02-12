import Router from "koa-router"
import knex from "../../knexfile"

const router = new Router()

async function checkBalance(amount: number, id: string) {
    if (amount <= 0 || amount >= 1001) {
        return false
    }

    const balance = (await knex("user").where({ userid: id }))[0].balance

    return parseInt(balance) >= amount
}

async function updateBalance(amount: number, id: string) {
    const { win, dice } = await gamble(amount)

    const balance = (await knex("user").where({ userid: id }))[0].balance

    await knex("user")
        .where({ userid: id })
        .update({
            balance: win + parseInt(balance)
        })

    const newBalance = win + parseInt(balance)

    return { dice, newBalance }
}

async function gamble(amount: number) {
    const dice = Math.floor(Math.random() * 100) + 1
    const win = dice === 100 ? amount * 2 : dice >= 50 ? amount : -amount

    return { win, dice }
}

router.get("/:id/:token/bet/:amount", async (ctx, next) => {
    const user = (await knex("user").where({ userid: ctx.params.id }))[0]
    if (user.token == ctx.params.token) {
        const amount = parseInt(ctx.params.amount)
        const id = ctx.params.id

        if (await checkBalance(amount, id)) {
            const { dice, newBalance } = await updateBalance(amount, id)
            ctx.body = {
                rolled: dice,
                won: dice >= 50 ? true : false,
                amountWon:
                    dice === 100 ? amount * 3 : dice >= 50 ? amount * 2 : 0,
                newBalance
            }
        } else {
            ctx.body = { error: 500, errorMessage: "You can't do that." }
        }
    } else {
        ctx.body = "Unauthorized!"
    }
})

router.get("/:id/:token/bet", async (ctx, next) => {
    const user = (await knex("user").where({ userid: ctx.params.id }))[0]
    if (user.token == ctx.params.token) {
        ctx.body = "Add /${amount} to your link to use bet. Use POST"
    } else {
        ctx.body = "Unauthorized!"
    }
})

router.get("/:id/:token", async (ctx, next) => {
    const user = (await knex("user").where({ userid: ctx.params.id }))[0]
    if (user.token == ctx.params.token) {
        ctx.body = user
    } else {
        ctx.body = "Unauthorized!"
    }
})

router.get("/", (ctx, next) => {
    ctx.body = "users"
})

export default router
