import React from "react";
import { LoginToken } from "../hooks/useLogin";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../Screens/Home";
import { SignIn } from "../Screens/SignIn";
import { SignUp } from "../Screens/SignUp";
import { ProtectedRoute } from "./ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppContext = React.createContext<{
  login: LoginToken | undefined;
  setLogin: React.Dispatch<React.SetStateAction<LoginToken | undefined>>;
}>({
  login: undefined,
  setLogin: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

export const Contexts = () => {
  const [login, setLogin] = useLocalStorage<LoginToken | undefined>("login");
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ login, setLogin }}>
        <Router>
          <Routes>
            <Route path="/sign-in" Component={SignIn} />
            <Route path="/sign-up" Component={SignUp} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};
