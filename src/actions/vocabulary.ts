import { VOCABULARY } from "../constants";
import { get, post } from "../servises/httpRequests";
import { Vocabulary } from "../store/vocabulary";

export const getVocabulary = (): Promise<Vocabulary[]> =>
  get(VOCABULARY)
    .then(res => res.json())

export const vocabularyAdd = (translation_id: number): Promise<Vocabulary> =>
  post(`${VOCABULARY}/add`, { translation_id })
    .then(res => res.json())
