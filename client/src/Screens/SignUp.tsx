import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, styled, PaletteMode } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { useMutation } from "@tanstack/react-query";

/*
 * https://mui.com/material-ui/getting-started/templates/
 * sign up
 */

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

type SignUpType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export const SignUp = () => {
  const { signup } = useLogin();
  const signUp = useMutation(signup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>();

  const [signUpError, setSignUpError] = React.useState<string>();

  const onSubmit = (data: SignUpType) => {
    signUp
      .mutateAsync(data)
      .then(() => (window.location.href = "/sign-in"))
      .catch(() => setSignUpError("There was an issue creating your account"));
  };

  return (
    <>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: "center",
            height: "100dvh",
            p: 2,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <TextField
                  {...register("first_name", {
                    required: "Please enter your first name",
                  })}
                  fullWidth
                  placeholder="Jon Snow"
                  error={!!errors?.first_name}
                  helperText={errors?.first_name && errors.first_name.message}
                  color={errors?.first_name ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Last Name</FormLabel>
                <TextField
                  {...register("last_name", {
                    required: "Please enter your last name",
                  })}
                  fullWidth
                  placeholder="Jon Snow"
                  error={!!errors?.last_name}
                  helperText={errors?.last_name && errors.last_name.message}
                  color={errors?.last_name ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors?.email && errors?.email.message}
                  type="email"
                  placeholder="your@email.com"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  color={errors?.email ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  {...register("password", {
                    required: "Please enter a password",
                  })}
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={!!errors?.password}
                  helperText={errors?.password && errors.password.message}
                  color={errors?.password ? "error" : "primary"}
                />
              </FormControl>
              {signUpError && (
                <Typography variant="body2" color="error">
                  {signUpError}
                </Typography>
              )}
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link
                    href="/sign-in"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </>
  );
};
