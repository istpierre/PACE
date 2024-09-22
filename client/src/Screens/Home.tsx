import Button from "@mui/material/Button";
import { useAppContext } from "../Components/contexts";
import { Typography } from "@mui/material";
import { useProjects } from "../hooks/useProjects";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const { login, setLogin } = useAppContext();
  const { projectsQuery } = useProjects();
  const projects = useQuery(projectsQuery);
  return (
    <div>
      <div>Home</div>
      <Typography>
        Hello {login?.first_name} {login?.last_name}
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          setLogin(undefined);
          window.location.reload();
        }}
      >
        Sign Out
      </Button>
      {projects?.data ? (
        <pre>{JSON.stringify(projects.data, null, 2)}</pre>
      ) : null}
    </div>
  );
};
