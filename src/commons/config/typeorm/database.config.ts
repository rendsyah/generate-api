import * as Joi from 'joi';

export const DatabaseSchema = Joi.object({
    host: Joi.string(),
    port: Joi.number().default(3306),
    username: Joi.string(),
    password: Joi.string(),
    database: Joi.string(),
});
