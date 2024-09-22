import { Navigate } from "react-router-dom";
import { useAppContext } from "./Contexts";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { login } = useAppContext();
  console.log(login);
  const allowedRoutes =
    window.location.pathname === "/sign-in" ||
    window.location.pathname === "/sign-up";
  if (!login && !allowedRoutes) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};
