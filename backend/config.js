require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  database: {
    username: process.env.DB_USR,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  uuidv5: {
    namespace: process.env.MY_NAMESPACE,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS),
    secretSalt: process.env.SECRET_PASSWORD,
  },
  ratelimit: {
    maxTime: process.env.MAX_TIME,
    maxRequest: process.env.MAX_REQUEST
  },
  mssqlStore: {
    config: {
      user: process.env.DB_USR,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST,
      database: 'sessions',
      options: {
        encrypt: true
      }
    }
  },
  expressSession: {
    secret: process.env.SESSION_SECRET
  }
}