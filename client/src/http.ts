import axios from "axios";
import config from "./config.json";
import { getItem } from "./hooks/useLocalStorage";
import { LoginToken } from "./hooks/useLogin";

export const authed = axios.create({
  baseURL: config.API_URL,
  headers: { Authorization: getItem<LoginToken>("login")?.token },
});
export const unauthed = axios.create({
  baseURL: config.API_URL,
});
