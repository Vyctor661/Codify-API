import { randomInt } from "./randomInt"

import { minReward, maxReward } from "../constants"

export const gamble = (amount: number) => {
    const dice = randomInt(minReward)(maxReward)
    const winAmount = dice === 100 ? amount * 2 : dice >= 50 ? amount : -amount*2

    return [dice, winAmount] as const
}
