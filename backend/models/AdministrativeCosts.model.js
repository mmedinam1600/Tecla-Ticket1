
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const AdministrativeCostsModel = DB.sequelize.define('AdministrativeCosts', {
    administrative_cost_id: {
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
    concept_administrative_cost: {
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

class AdministrativeCosts {
  async createAdministrativeCosts (administrative_costs) {
    return DB.sequelize.models.AdministrativeCosts.bulkCreate(administrative_costs);
  }
}


module.exports = {
  defineModel,
  AdministrativeCosts
}