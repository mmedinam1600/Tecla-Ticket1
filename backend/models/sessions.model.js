
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const Sessions = DB.sequelize.define('Sessions', {
    sid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    // Otras opciones del modelo
    sequelize: DB.sequelize, // Es necesario pasar la conexión como parametro
    underscored: true,
    timestamps: false, // don't add the timestamp attributes (updatedAt, createdAt)
    updatedAt: false,
    createdAt: false
  });
}


module.exports = {
  defineModel
}