const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const DATABASE_HOST = process.env.DATABASE_HOST ?? "";
const DATABASE_PORT = process.env.DATABASE_PORT ?? 5432;
const DATABASE_USER = process.env.DATABASE_USER ?? "";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? "";
const DB_DATABASE = process.env.DB_DATABASE ?? "";

module.exports = {
  PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DB_DATABASE,
};