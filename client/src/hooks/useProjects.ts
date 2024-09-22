import { UseQueryOptions } from "@tanstack/react-query";
import { authed } from "../http";

export type Project = {
  id: number;
  name: string;
  description: string;
  created_by: number;
  created_at: string;
  start_date: string;
  end_date: string;
  created_by_user: string;
  latest_status: string;
};

export type Task = {
  id: number;
  project_id: number;
  name: string;
  description: string | null;
  assigned_to: number | null;
  due_date: string | null;
  created_by: number;
  created_at: string;
  created_by_user: string;
  latest_status: string;
};

const getProjects = () =>
  authed.get<Project[]>("/api/projects").then(({ data }) => data);

const getProjectById = (id: number) =>
  authed
    .get<Project & { tasks: Task[] }>(`/api/projects/${id}`)
    .then(({ data }) => data);

const PROJECTS_QUERY_KEY = `/api/projects`;
const PROJECTS_ID_QUERY_KEY = `/api/projects/:id`;

export const useProjects = () => {
  const projectsQuery: UseQueryOptions<Project[]> = {
    queryKey: [PROJECTS_QUERY_KEY],
    queryFn: getProjects,
  };

  const projectsByIdQuery = (
    id: number
  ): UseQueryOptions<Project & { tasks: Task[] }> => ({
    queryKey: [PROJECTS_ID_QUERY_KEY, id],
    queryFn: () => getProjectById(id),
  });

  return {
    projectsQuery,
    projectsByIdQuery,
  };
};
