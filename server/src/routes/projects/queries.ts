import { Query } from "../../db";

export type Task = {
  id: number;
  project_id: number;
  name: string;
  description: string;
  assigned_to: number;
  due_date: string;
  created_by: number;
  created_at: string;
};

export type TaskStatus = {
  task_id: number;
  status: string;
  created_by: number;
  created_at: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  created_by: number;
  created_at: string;
  start_date: string;
  end_date: string;
};

export type ProjectStatus = {
  project_id: number;
  status: string;
  created_by: number;
  created_at: string;
};

export const all = (): Query<
  Project & { created_by_user: string; status: string }
> => ({
  sql: `select 
          projects.*
        , concat(users.first_name, ' ', users.last_name) as created_by_user 
        , (
            SELECT ps.status
            FROM project_status ps
            WHERE ps.project_id = projects.id
            ORDER BY ps.created_at DESC
            LIMIT 1
          ) AS status
       from projects
       inner join users on users.id = projects.created_by`,
});

export const byId = (params: { id: number }): Query<any> => ({
  sql: `SELECT 
          projects.*
        , CONCAT(users.first_name, ' ', users.last_name) AS created_by_user
        , (
            SELECT ps.status
            FROM project_status ps
            WHERE ps.project_id = projects.id
            ORDER BY ps.created_at DESC
            LIMIT 1
          ) AS latest_status
        , (
            SELECT json_agg(t)
            FROM (
                   select 
                     tasks.*
                   , CONCAT(users.first_name, ' ', users.last_name) AS created_by_user
                   , (
                        SELECT ps.status
                        FROM project_status ps
                        WHERE ps.project_id = projects.id
                        ORDER BY ps.created_at DESC
                        LIMIT 1
                     ) AS latest_status
                   from tasks
                   inner join users on users.id = tasks.created_by 
                 ) as t
        
           ) AS tasks
        FROM projects
        INNER JOIN users ON users.id = projects.created_by
        where projects.id = $1`,
  params,
});

export const insertProject = (
  params: Omit<Project, "created_at" | "id">
): Query<{ id: number }> => ({
  sql: `insert into projects (name, description, created_by, start_date, end_date)
        values($1, $2, $3, $4, $5)
        RETURNING id;`,
  params,
});

export const insertProjectStatus = (
  params: Omit<ProjectStatus, "created_at">
): Query<any> => ({
  sql: `insert into project_status (project_id, status, created_by)
        values($1, $2, $3)`,
  params,
});

export const insertTask = (
  params: Omit<Task, "id" | "created_at">
): Query<any> => ({
  sql: `insert into tasks (project_id, name, description, assigned_to, due_date, created_by)
        values($1, $2, $3, $4, $5, $6)
        RETURNING id;`,
  params,
});

export const insertTaskStatus = (
  params: Omit<TaskStatus, "created_at">
): Query<any> => ({
  sql: `insert into task_status (task_id, status, created_by)
        values($1, $2, $3)`,
  params,
});
