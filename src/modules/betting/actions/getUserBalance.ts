import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const getUserBalance = async (id: User["userId"]) => {
    const user = (
        await db<User>("user")
            .select("balance")
            .where({ userid: id })
    )[0]
    if (!user) return null

    return user.balance
}
