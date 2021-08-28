
const { UserService } = require('../services/user.service');
const { JwtService } = require("../services/jwt.service");

const userService = new UserService();
const jwtService = new JwtService();

class Account {
  //Controlador para generar JWT de un usuario
  async loginUser(req, res) {
    const { email, password } = req.body; // { email: 'example@example.com', password: 'password' }
    try {
      if(await userService.checkIfCredentialsAreValid(email, password)) { //Checamos si su contraseña coincide con la BD
        const userData = await userService.getUserByEmail(email); //Obtenemos la información del usuario
        const token = await jwtService.generateJWT(userData); //Generamos su JWT
        res.status(200).json({
          status: true,
          msg: 'Usuario logeado correctamente',
          token
        });
      } else {
        res.status(400).json({
          status: false,
          msg: 'Correo o contraseña incorrecta',
          token: ''
        });
      }
    } catch (e) {
      res.status(500).json({
        status: false,
        msg: 'Error del servidor al iniciar sesión',
        token: ''
      });
    }
  }

  async checkSessionUser(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]; //Obtenemos el token de las cabeceras
      const result = jwtService.validateToken(token); //Si el token es válido obtenemos la información del token
      res.status(200).json({
        status: true,
        message: 'Bienvenido',
        nickname: result.data.nickname,
        email: result.data.email,
      });
    } catch (e) {
      res.status(400).json({
        status: false,
        msg: 'El JWT no es válido o expiro, redirigir a Login: ' + e.message
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        status: true,
        data: users
      });
    } catch (e) {
      res.status(400).json({
        status: false,
        msg: 'Error al obtener los usuarios: ' + e.message
      });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({
        status: true,
        data: user
      });
    } catch (e) {
      res.status(400).json({
        status: false,
        msg: 'Error al obtener los usuarios: ' + e.message
      });
    }
  }





}


module.exports = {
  Account
}