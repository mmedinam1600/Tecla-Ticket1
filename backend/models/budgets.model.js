
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const Budgets = DB.sequelize.define('Budgets', {
    budget_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {
    // Otras opciones del modelo
    sequelize: DB.sequelize, // Es necesario pasar la conexión como parametro
    underscored: true,
    //updatedAt: 'updated_at',
    //createdAt: 'created_at'
  });
}


module.exports = {
  defineModel
}