
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const ResourcesModel = DB.sequelize.define('Resources', {
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthly_cost: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0.00,
    },
    monthly_resource: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0.00,
    },
    budget_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // Modelo de referencia
        model: 'Budgets',
        // Nombre de la columna de referencia
        key: 'budget_id',
      }
    }
  }, {
    sequelize: DB.sequelize,
    underscored: true,
  });
}



module.exports = {
  defineModel
}