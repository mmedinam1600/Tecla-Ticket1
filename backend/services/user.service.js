const { findUserByEmail } = require('../models/users.model');

const bcrypt = require('bcrypt');
const { v5: uuidv5 } = require('uuid');
const jwtService = require('./jwt.service');
const config = require('../config');

const checkIfCredentialsAreValid = async (user) => {
  const fetchUser = await findUserByEmail(user.email);
  if(fetchUser){ //Si encuentra el usuario por su email, validamos que sea correcta su contraseña
    const passwordHash = fetchUser.password;
    const isValid = bcrypt.compareSync(config.bcrypt.secretSalt + user.password, passwordHash);
    if(!isValid){
      return false;
    }
    return true;
  }
}



const getUserByEmail = async (email) => {
  try {
    const fetchUser = await findUserByEmail(email);
    return {
      id: fetchUser.user_id,
      nickname: fetchUser.nickname,
      email: fetchUser.email,
      password: fetchUser.password
    };
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  checkIfCredentialsAreValid,
  getUserByEmail
}