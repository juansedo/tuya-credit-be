import * as Joi from 'joi';

export default Joi.object({
  BACKEND_BASE_URL: Joi.string().required(),
});
