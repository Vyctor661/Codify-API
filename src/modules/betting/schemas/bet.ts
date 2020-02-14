import Joi from "@hapi/joi"

export default Joi.object({
    id: Joi.string(),
    token: Joi.string(),
    amount: Joi.number()
})
