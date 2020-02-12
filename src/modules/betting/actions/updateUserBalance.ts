import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const updateUserBalance = (id: User["userId"]) => (
    amount: User["balance"]
) =>
    db<User>("users")
        .where({ userid: id })
        .increment("balance", amount)
        .returning("balance")
