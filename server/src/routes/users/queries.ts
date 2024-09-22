import { Query } from "../../db";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  salt: string;
  hash: string;
};

export const insert = (params: Omit<User, "id">): Query<any> => ({
  sql: `INSERT INTO users (first_name, last_name, email, salt, hash)
        VALUES($1, $2, $3, $4, $5)`,
  params,
});

export const getUserByEamil = (params: { email: string }): Query<User> => ({
  sql: `select * from users where email = $1`,
  params,
});
