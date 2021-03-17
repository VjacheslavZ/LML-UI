import { VOCABULARY } from "../constants";
import { get, post, patch } from "../servises/httpRequests";
import { Vocabulary, VocabularyStatus } from "../store/vocabulary";

export const getVocabulary = (): Promise<Vocabulary[]> =>
  get(VOCABULARY)
    .then(res => res.json())

export const vocabularyAdd = (translation_id: number): Promise<Vocabulary> =>
  post(`${VOCABULARY}/add`, { translation_id })
    .then(res => res.json())

export const vocabularyUpdateStatus = (vocab_id: string, status: VocabularyStatus): Promise<Vocabulary> =>
  patch(`${VOCABULARY}/${vocab_id}/status`, {status})
    .then(res => res.json())
