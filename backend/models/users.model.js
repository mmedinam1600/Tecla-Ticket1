
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


const checkIfExistsUser = async (email) => {
  const user = await DB.sequelize.models.Users.findOne({ where: { email: email } });
  console.log(user);
  return false;
}

const findUserByEmail = async (email) => {
  return DB.sequelize.models.Users.findOne({ where: { email: email }});
}


module.exports = {
  defineModel,
  findUserByEmail
}