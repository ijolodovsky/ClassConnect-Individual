const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DB_DATABASE,
  DATABASE_PORT,
} = require("./common/constants.js");

const DBConfig = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DB_DATABASE,
};

module.exports = { DBConfig };
