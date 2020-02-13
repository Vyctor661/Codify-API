import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const getUserToken = async (id: User["userId"]) => {
    const user = (
        await db<User>("user")
            .select("token")
            .where({ userid: id })
    )[0]
    if (!user.token) return null

    return user.token
}
