import * as Joi from 'joi';

export default Joi.object({
  JWT_EXPIRES: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
