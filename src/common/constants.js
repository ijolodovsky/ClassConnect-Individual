import 'dotenv/config'

export const PORT = process.env.PORT ?? 3000;

export const DATABASE_HOST = process.env.DATABASE_HOST ?? '';
export const DATABASE_PORT = process.env.DATABASE_PORT ?? 5432;
export const DATABASE_USER = process.env.DATABASE_USER ?? '';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? '';
export const DB_DATABASE = process.env.DB_DATABASE ?? '';