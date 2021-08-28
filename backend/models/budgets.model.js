
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

  async editBudget(project, version, id) {
    return DB.sequelize.models.Budgets.update({
      project: project,
      version: version,
    }, {
      where: {
        budget_id: id
      }
    });
  }

  async getBudgetByID(id) {
    return DB.sequelize.models.Budgets.findOne({
      where: {
        budget_id: id,
        active: true
      },
    });
  }

  async getAllBudgets() {
    return DB.sequelize.models.Budgets.findAll({
      where: {
        active: true
      }
    });
  }

  async deleteBudgetById(id) {
    try {
      const budget = await this.getBudgetByID(id);
      if(budget) {
        return await DB.sequelize.models.Budgets.update({
          active: false
        }, {
          where: {
            budget_id: id
          }
        });
      }
      throw new Error(`El presupuesto con el id ${id} no existe`);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAllDataOfBudgetByID(id) {
    const condition = { where: { budget_id: id }};
    const budget = await DB.sequelize.models.Budgets.findOne({ where: { budget_id: id, active: true }});
    if(!budget) return { msg: 'No existe un presupuesto con el id: ' + id}
    const administrativeCosts = await DB.sequelize.models.AdministrativeCosts.findAll(condition);
    const revenues = await DB.sequelize.models.Revenues.findAll(condition);
    const resources = await DB.sequelize.models.Resources.findAll(condition);
    const directCosts = await DB.sequelize.models.DirectCosts.findAll(condition);
    const cashFlow = await DB.sequelize.models.CashFlows.findAll(condition);
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