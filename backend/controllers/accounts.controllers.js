
const { checkIfCredentialsAreValid, getUserByEmail } = require('../services/user.service');
const { generateJWT, validateToken} = require("../services/jwt.service");


async function loginUser(req, res) {
  try{
    const user = req.body; // { email: 'example@example.com', password: 'password' }
    if(await checkIfCredentialsAreValid(user)){ //Checamos si su contraseña coincide con la BD
      const userData = await getUserByEmail(user.email); //Obtenemos la información del usuario
      const token = await generateJWT(userData); //Generamos su JWT
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

async function checkSessionUser(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Obtenemos el token de las cabeceras
    const result = validateToken(token); //Si el token es válido obtenemos la información del token
    let valid = {
      status: true,
      message: 'Bienvenido',
      nickname: result.data.nickname,
      email: result.data.email,
    }
    res.status(200).json(valid);
  } catch (e) {
    res.status(400).json('Usuario no autenticado, redirigir a Login: ' + e.message);
  }
}


module.exports = {
  loginUser,
  checkSessionUser
}