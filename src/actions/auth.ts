import { post } from "../servises/httpRequests";
import { SIGN_IN } from "../constants";


export const login = (username: string, password: string) => post(SIGN_IN, {
  username,
  password,
})
  .then(res => res.json());

// TODO
export const signup = () => {};
