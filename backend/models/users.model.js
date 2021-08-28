
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const Users = DB.sequelize.define('Users', {
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    // Otras opciones del modelo
    sequelize: DB.sequelize, // Es necesario pasar la conexión como parametro
    underscored: true,
    //updatedAt: 'updated_at',
    //createdAt: 'created_at'
  });
}

class User {

  excludeAttributes = {
    exclude: [
      'updatedAt',
      'createdAt',
      'active'
    ]
  };


  findUserByEmail = async (email) => DB.sequelize.models.Users.findOne({
    where: {
      email: email,
      active: true
    },
    attributes: this.excludeAttributes
  }).catch((err) => { throw new Error(`Error buscar un usuario por su Email: ${err.message}`) });

  findUserById = async (id) => DB.sequelize.models.Users.findOne({
    where: {
      user_id: id,
      active: true
    },
    attributes: {
      exclude: [
        'updatedAt',
        'createdAt',
        'password',
        'active'
      ]
    }
  })

  findAllUsers = async () => DB.sequelize.models.Users.findAll({
    where: {
      active: true
    },
    attributes: {
      exclude: [
        'updatedAt',
        'createdAt',
        'password',
        'active'
      ]
    }
  }).catch((err) => { throw new Error(`Error al buscar todos los usuarios: ${err.message}`) })



}


module.exports = {
  defineModel,
  User
}