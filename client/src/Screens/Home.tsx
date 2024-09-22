import Button from "@mui/material/Button";
import { useAppContext } from "../Components/contexts";
import { Typography } from "@mui/material";

export const Home = () => {
  const { login, setLogin } = useAppContext();
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
    </div>
  );
};
