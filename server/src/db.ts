import { Pool } from "pg";
import { config } from "./config";

export const pool = new Pool(config.dbConfig);

export type Query<A> = {
  sql: string;
  params?: Object;
};

export const executeQuery = async <A>(
  pool: Pool,
  query: Query<A>
): Promise<A[]> => {
  const client = await pool.connect();

  const result = await client.query(
    query.sql,
    query.params ? Object.values(query.params) : undefined
  );
  client.release();
  return result.rows;
};

export const closePool = () => pool.end();
