import { Middleware } from "koa"

import { ObjectSchema } from "@hapi/joi"

import { HttpError } from "../../error/classes/httpError"

type validationField = "body" | "params" | "query"

export const validateSchema = (
    schema: ObjectSchema,
    field: validationField
): Middleware => (ctx, next) => {
    const result = schema.validate(ctx[field])

    if (result.error) {
        throw new HttpError(400, "Invalid Syntax", result.error.details)
    }

    return next()
}
