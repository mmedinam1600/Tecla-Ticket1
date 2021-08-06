const express = module.exports = require('express');
const app = express();
require('dotenv').config();
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

//CONFIGURATION
app.set('port', process.env.PORT || 3000);

//ROUTES
const accounts = require("./routes/accounts.js");
const budgets = require("./routes/budgets.js");
app.use('/accounts', accounts);
app.use('/budgets', budgets);

//ERROR HANDLERS
app.use(function(req, res, next){
  res.status(404);
  res.format({
    //html: function () {
    //  res.send('Not Found HTML');
    //},
    //"Accept: application/json"
    json: function () {
      res.json({ error: 'Not Found JSON' });
    }, //"Accept: text/plain"
    default: function () {
      res.type('txt').send('Not found');
    }
  });
});


const startServer = () => {
  try {
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en http://${process.env.HOST}:${app.get('port')}`);
    });
  } catch (e) {
    console.log(`Error al iniciar el servidor: \n${e.message}`);
  }
}

startServer();

