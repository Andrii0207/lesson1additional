const Joi = require("joi");

function dataValidator(data) {
  const shema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });

  return shema.validate(data);
}

module.exports = dataValidator;
