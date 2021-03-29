import { TRANSLATION } from "../constants";
import { post } from "../servises/httpRequests";

export interface ITranslation {
  id: number;
  text: string;
  translation: string;
}

export const getTranslations = (text: string): Promise<ITranslation> =>
  post(TRANSLATION, { text }).then(res => res.json());
