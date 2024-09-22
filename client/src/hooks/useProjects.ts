import { UseMutationOptions } from "@tanstack/react-query";
import { unauthed } from "../http";

export type LoginToken = {
  token: string;
  email: string;
  first_name: string;
  last_name: string;
};

type Login = {
  email: string;
  password: string;
};

type SignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const doLogin = async (data: Login) =>
  await unauthed
    .post<{ token: string }>(`/api/users/login`, data)
    .then(({ data }) => data);

const signUp = (data: SignUp) =>
  unauthed.post(`/api/users`, data).then(({ data }) => data);

export const useLogin = () => {
  const signin: UseMutationOptions<
    any,
    Error,
    {
      email: string;
      password: string;
    }
  > = {
    mutationFn: doLogin,
  };

  const signup: UseMutationOptions<any, Error, SignUp> = {
    mutationFn: (data) => signUp(data),
  };

  return {
    signin,
    signup,
  };
};
