const express = module.exports = require('express');
const app = express();
const config = require('./config.js');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const ratelimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { DB } = require('./db/connection');
const MSSQLStore = require('connect-mssql-v2');
const session = require('express-session');

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());

app.use(session({
  secret: `${config.expressSession.secret}`,
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }, //No se que hace
  store: new MSSQLStore.default(config.mssqlStore.config)
}));

//CAMPOS DE SEGURIDAD
app.use(express.json({ parameterLimit: '1000kb'}));
app.use(express.json({ limit: '1000kb'})); //El peso máximo de el json es de 1000kb
app.use(bodyParser.json({ parameterLimit: '1000' })); //Limitamos el número de parámetros en una petición.
app.use(ratelimit({
  windowMs: config.ratelimit.maxTime * 10 * 1000, //20 minutos permitidos
  max: config.ratelimit.maxRequest //Peticiones al servidor dentro de la ventana del tiempo anterior
}));
app.use(helmet());

//CONFIGURATION
app.set('port', config.app.port || 3000);

//ROUTES
const users = require("./routes/users.js");
const budgets = require("./routes/budgets.js");
app.use('/users', users);
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

const modelUser = require('./models/users.model');

const startServer = async () => {
  try {
    await DB.sequelize.authenticate();
    DB.loadModels();
    await DB.createModels();
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en http://${config.app.host}:${app.get('port')}`);
    });
  } catch (e) {
    console.log(`Error al iniciar el servidor: \n${e.message}`);
  }
}

startServer();