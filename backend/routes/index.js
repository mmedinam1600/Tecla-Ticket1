const express = require('../app');
const app = express();

const budgetsRoutes = require('./budgets');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

app.get('/', (req, res) => {
    return res.status(200).json({ msg: `El servidor esta funcionando correctamente :D` });
});
app.use('/budgets', budgetsRoutes); //Rutas de presupuestos
app.use('/users', usersRoutes); //Rutas de usuarios
app.use('/', authRoutes); //Rutas de autentificación

module.exports = app;