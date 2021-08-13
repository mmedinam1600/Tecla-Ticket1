
const Joi = require('joi');
const { UserDTO } = require('../dto/user.dto');

const userDto = new UserDTO();

class UserMiddlewares {
  async validateDataLoginUser(req, res, next) {
    try {
      await Joi.attempt(req.body, userDto.post);
      return next(); //Si no hay error en la validación continuamos.
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async validateSessionUser(req, res, next) {
    try{
      await Joi.attempt(req.headers.authorization, userDto.session);
      return next();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}


module.exports = UserMiddlewares;