import * as Joi from 'joi';

export default Joi.object({
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
});
