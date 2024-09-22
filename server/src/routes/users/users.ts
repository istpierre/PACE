import express from "express";
import { HandleType } from "../../routeHandler";
import { Query } from "../../db";
import { generateUserInsert } from "./helpers";
import * as Users from "./queries";
import { authenticate } from "./auth";

export const createUserRoutes = (
  handle: HandleType,
  query: <A>(q: Query<A>) => Promise<A[]>
) => {
  const app = express.Router();

  app.post(
    "/",
    handle(async (req) => {
      const { first_name, last_name, email, password } = req.body;
      const { salt, hash } = generateUserInsert(email, password);

      return await query(
        Users.insert({ first_name, last_name, email, salt, hash })
      );
    })
  );

  app.post(
    "/login",
    handle(async (req) =>
      authenticate(
        { email: req.body.email, password: req.body.password },
        query
      )
    )
  );

  return app;
};
