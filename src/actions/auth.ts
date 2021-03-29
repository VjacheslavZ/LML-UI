import { post } from "../servises/httpRequests";
import { SIGN_IN, SIGN_UP } from "../constants";

export interface IUser {
  password: string;
  email: string;
}

export const login = (data: IUser) =>
  post(SIGN_IN, {
    ...data
  }).then(res => res.json());

export const signup = (data: IUser) =>
  post(SIGN_UP, {
    ...data
  }).then(res => res.json());
