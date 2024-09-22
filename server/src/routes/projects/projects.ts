import express from "express";
import { HandleType } from "../../routeHandler";
import { Query } from "../../db";
import { auth } from "../../middleware/auth";
import * as Projects from "./queries";

export const createProjectRoutes = (
  handle: HandleType,
  query: <A>(q: Query<A>) => Promise<A[]>
) => {
  const app = express.Router();

  app.use(auth(query));

  app.post(
    "/",
    handle(async (req, { user }) => {
      const { name, description, start_date, end_date } = req.body;
      const [{ id }] = await query(
        Projects.insertProject({
          name,
          description,
          created_by: user.id,
          start_date,
          end_date,
        })
      );
      await query(
        Projects.insertProjectStatus({
          project_id: id,
          status: "not started",
          created_by: user.id,
        })
      );
      return id;
    })
  );

  app.get(
    "/",
    handle(async () => query(Projects.all()))
  );

  app.get(
    "/:id",
    handle(async (req) => query(Projects.byId({ id: +req.params.id })))
  );

  app.post(
    "/:id/task",
    handle(async (req, { user }) => {
      const {
        name,
        description = null,
        assigned_to = null,
        due_date = null,
      } = req.body;

      const [{ id }] = await query(
        Projects.insertTask({
          project_id: +req.params.id,
          name,
          description,
          assigned_to,
          due_date,
          created_by: user.id,
        })
      );

      await query(
        Projects.insertTaskStatus({
          task_id: id,
          status: "not started",
          created_by: user.id,
        })
      );

      return id;
    })
  );

  return app;
};
