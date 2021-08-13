
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const RevenuesModel = DB.sequelize.define('Revenues', {
    revenue_id: {
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
    concept_revenue: {
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

class Revenues {
  createRevenues(revenues_list) {
    return DB.sequelize.models.Revenues.bulkCreate(revenues_list);
  }
}


module.exports = {
  defineModel,
  Revenues
}