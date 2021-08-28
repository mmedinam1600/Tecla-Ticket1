const Joi = require('joi');

class UserDTO {
  post = Joi.object().keys({
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
  });

  session = Joi.string().required();

  getId = Joi.object().keys({
    id: Joi.string().required(),
  });


}

module.exports = {
  UserDTO
}