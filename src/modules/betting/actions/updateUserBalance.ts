import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const updateUserBalance = (id: User["userId"]) => async (
    amount: User["balance"]
) =>
    (
        await db<User>("user")
            .where({ userid: id })
            .increment("balance", amount)
            .returning("balance")
    )[0]
