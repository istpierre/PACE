import { PoolConfig } from "pg";

export type Config = {
  dbConfig: PoolConfig;
};

export const config: Config = {
  dbConfig: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  },
};
