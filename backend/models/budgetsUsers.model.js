
const {DB, DataTypes, Model} = require('../db/connection');

const defineModel = () => {
  const BudgetsUsers = DB.sequelize.define('BudgetsUsers', {
    budget_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        // Modelo de referencia
        model: 'Users',
        // Nombre de la columna de referencia
        key: 'user_id'
      }
    },
    budget_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Budgets',
        key: 'budget_id'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize: DB.sequelize, // Es necesario pasar la conexión como parametro
    underscored: true,
  });
}

class BudgetUsers {
  async createBudgetUsers(user_id, budget_id) {
    return DB.sequelize.models.BudgetsUsers.create({
      user_id: user_id,
      budget_id: budget_id,
    });
  }

  async editBudgetUsers(user_id, budget_id) {
    return DB.sequelize.models.BudgetsUsers.update({
      user_id: user_id,
      budget_id: budget_id,
    }, {
      where: {
        budget_id: budget_id,
      }
    });
  }
}

module.exports = {
  defineModel,
  BudgetUsers
}
