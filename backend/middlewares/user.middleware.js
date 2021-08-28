
const Joi = require('joi');
const { UserDTO } = require('../dto/user.dto');

const userDto = new UserDTO();

class UserMiddlewares {
  async validateDataLoginUser(req, res, next) {
    try {
      console.log(req.body);
      await Joi.attempt(req.body, userDto.post);
      return next(); //Si no hay error en la validación continuamos.
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  async validateSessionUser(req, res, next) {
    try {
      await Joi.attempt(req.headers.authorization, userDto.session);
      return next();
    } catch (e) {
      return res.status(500).json({
        status: false,
        error: "Este es un sistema seguro y se requiere autentificación"
      });
    }
  }

  async validateIdParameter(req, res, next) {
    try {
      await Joi.attempt(req.params, userDto.getId);
      return next();
    } catch (e) {
      return res.status(500).json({
        status: false,
        error: "Debes ingresar un id de un usuario válida"
      });
    }
  }



}


module.exports = UserMiddlewares;