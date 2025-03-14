import { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DB_DATABASE, DATABASE_PORT } from './common/constants.js';

export const DBConfig = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DB_DATABASE,
};