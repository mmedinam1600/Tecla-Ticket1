const {User} = require('../models/users.model');

const bcrypt = require('bcrypt');
const {v5: uuidv5} = require('uuid');
const jwtService = require('./jwt.service');
const config = require('../config');

const user = new User();

class UserService {

    checkIfCredentialsAreValid = async (email, password) => {
        const fetchUser = await user.findUserByEmail(email);
        return (fetchUser) ? bcrypt.compareSync(config.bcrypt.secretSalt + password, fetchUser.password) : false;
    }

    getUserByEmail = async (email) => {
        try {
            const fetchUser = await user.findUserByEmail(email);
            return (fetchUser) ? {
                    id: fetchUser.user_id,
                    nickname: fetchUser.nickname,
                    email: fetchUser.email
                } :
                {
                    error: 'Usuario no encontrado'
                }
        } catch (e) {
            throw new Error(e);
        }
    }

    getUserById = async (id) => {
        try {
            const fetchUser = await user.findUserById(id);
            return (fetchUser) ? {
                    id: fetchUser.user_id,
                    nickname: fetchUser.nickname,
                    email: fetchUser.email
                } :
                {
                    error: 'Usuario no encontrado'
                }
        } catch (e) {
            throw new Error(e);
        }
    }

    getAllUsers = () => user.findAllUsers()
        .catch( (err) => { throw new Error(err); });



}

module.exports = {
    UserService
}