import { PROFILE_URL } from "../constants";
import { get } from "../servises/httpRequests";

export const getProfile = () =>
  get(PROFILE_URL)
    .then(res => res.json())
