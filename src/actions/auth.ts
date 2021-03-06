import {post} from "../servises/httpRequests";

const BASE_URL = 'http://localhost:3000';

export const login = (username: string, password: string) => post(`${BASE_URL}/auth/signin`, {
  username,
  password,
})
  .then(res => res.json());

export const register = () => {
};
