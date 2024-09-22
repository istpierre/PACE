import { Application } from "express";
import { createUserRoutes } from "./routes/users/users";
import { handle } from "./routeHandler";
import { executeQuery, pool, Query } from "./db";
import { createProjectRoutes } from "./routes/projects/projects";

export const createAPI = (app: Application) => {
  const query = <A>(q: Query<A>) => executeQuery<A>(pool, q);

  app.use("/api/users", createUserRoutes(handle, query));
  app.use("/api/projects", createProjectRoutes(handle, query));
};
