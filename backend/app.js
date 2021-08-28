const express = module.exports = require('express');
const app = express();
const config = require('./config.js');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const ratelimit = require("express-rate-limit");
const rateLimitOptions = require('./middlewares/rateLimiter');
const errorHandler = require('./helpers/errorHandler');
const makeConnection = require("./helpers/makeConnectionDB");
const routes = require('./routes/index');

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cors());

//CAMPOS DE SEGURIDAD
app.use(express.json({ limit: '1000kb' })); //El peso máximo de el json es de 1000kb
app.use(ratelimit(rateLimitOptions));
app.use(helmet()); //Configuración de cabeceras de seguridad

//CONFIGURATION
app.set('port', config.app.port || 3000);

//ROUTES
app.use(routes);

// El manejador de errores debe ir abajo de las rutas,
// suponemos que si ninguna ruta llega a manejar la petición
// llega a este punto donde marcamos el error 404 por que la ruta no existe.
app.use(errorHandler);

const startServer = async () => {
  try {
    await makeConnection();
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en http://${config.app.host}:${app.get('port')}`);
    });
  } catch (e) {
    console.log(`Error al iniciar el servidor: \n${e.message}`);
  }
}

startServer();