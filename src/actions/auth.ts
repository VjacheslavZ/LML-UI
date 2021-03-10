import { post } from "../servises/httpRequests";
import { SIGN_IN, SIGN_UP } from "../constants";

export interface User {
  username: string;
  password: string;
}

export const login = ({ username, password }: User) => post(SIGN_IN, {
  username,
  password,
})
  .then(res => res.json());

export const signup = ({ username, password }: User) => post(SIGN_UP, {
  username,
  password,
})
  .then(res => res.json());
