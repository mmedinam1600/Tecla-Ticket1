
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

class Budget {

  async createBudget(project, version) {
    return DB.sequelize.models.Budgets.create({
      project: project,
      version: version,
    });
  }

  async getBudgetByID(id) {
    return DB.sequelize.models.Budgets.findAll({
      where: {
        budget_id: id
      },
    });
  }

  async getAllDataOfBudgetByID(id) {
    const condition = { where: { budget_id: id }};
    const budget = await DB.sequelize.models.Budgets.findOne(condition);
    const administrativeCosts = await DB.sequelize.models.AdministrativeCosts.findOne(condition);
    const revenues = await DB.sequelize.models.Revenues.findOne(condition);
    const resources = await DB.sequelize.models.Resources.findOne(condition);
    const directCosts = await DB.sequelize.models.DirectCosts.findOne(condition);
    const cashFlow = await DB.sequelize.models.CashFlows.findOne(condition);
    return {
      budget,
      administrativeCosts,
      revenues,
      resources,
      directCosts,
      cashFlow
    }
  }
}


module.exports = {
  defineModel,
  Budget
}