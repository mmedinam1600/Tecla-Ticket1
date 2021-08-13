
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const DirectCostsModel = DB.sequelize.define('DirectCosts', {
    direct_cost_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concept_direct_cost: {
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

class DirectCosts {
  createDirectCosts(directCosts_list) {
    return DB.sequelize.models.DirectCosts.bulkCreate(directCosts_list);
  }
}


module.exports = {
  defineModel,
  DirectCosts
}