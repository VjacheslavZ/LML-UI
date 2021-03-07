import { VOCABULARY } from "../constants";
import { get } from "../servises/httpRequests";

export const getVocabulary = () => get(VOCABULARY)
  .then(res => res.json())
