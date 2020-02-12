import { HttpError } from "../../error/classes/httpError"

import { User } from "../types/User"

import { maxAmount } from "../constants"

import { getUserBalance } from "../actions/getUserBalance"

export const checkAmount = (amount: User["balance"]) => async (
    id: User["userId"]
) => {
    if (amount < 1 || amount > maxAmount)
        throw new HttpError(
            400,
            `The betting amount must be a positive number higher than ${maxAmount}!`
        )

    const balance = (await getUserBalance(id))!

    return balance >= amount
}
