import { filter } from 'lodash'
import { ReduxAction } from './index'

export enum VocabularyActionType {
  fetchRequest = 'vocabulary/FetchRequest',
  fetchSuccess = 'vocabulary/FetchSuccess',
  fetchFailed = 'vocabulary/FetchFailed',
  addNewTranslation = 'vocabulary/AddNewTranslation',
  patchUpdateProgressStatus = 'vocabulary/PatchUpdateProgressStatus',

  deleteVocabularyRequest = 'vocabulary/DeleteVocabularyRequest',
  deleteVocabularyRequestSuccess = 'vocabulary/DeleteVocabularyRequestSuccess',
  deleteVocabularyRequestFailed = 'vocabulary/DeleteVocabularyRequestFailed',
}

export type VocabularyAction =
  | VocabularyFetchRequest
  | VocabularyFetchSuccess
  | VocabularyFetchFailed

  | AddNewTranslation

  | PatchUpdateProgressStatus

  | DeleteVocabularyRequest
  | DeleteVocabularyRequestSuccess
  | DeleteVocabularyRequestFailed

/* Actions interface start */
// Vocabulary
interface VocabularyFetchRequest extends ReduxAction {
  type: VocabularyActionType.fetchRequest;
}
interface VocabularyFetchSuccess extends ReduxAction {
  type: VocabularyActionType.fetchSuccess;
  payload: {
    vocabulary: VocabularyData,
  };
}
interface VocabularyFetchFailed extends ReduxAction {
  type: VocabularyActionType.fetchFailed;
}
// Add translation
interface AddNewTranslation extends ReduxAction {
  type: VocabularyActionType.addNewTranslation;
  payload: {
    translation: Vocabulary;
  }
}
// Update status
interface PatchUpdateProgressStatus extends ReduxAction {
  type: VocabularyActionType.patchUpdateProgressStatus;
  payload: {
    translation: Vocabulary;
  }
}
// Delete word from vocab
interface DeleteVocabularyRequest extends ReduxAction {
  type: VocabularyActionType.deleteVocabularyRequest;
}
interface DeleteVocabularyRequestSuccess extends ReduxAction {
  type: VocabularyActionType.deleteVocabularyRequestSuccess;
  payload: IDelete
}
interface DeleteVocabularyRequestFailed extends ReduxAction {
  type: VocabularyActionType.deleteVocabularyRequestFailed;
}
/* Actions interface end */

export interface IDelete {
  id: number;
  status: string;
}

export const VocabularyActions = {
  fetchRequest: (): VocabularyAction => ({
    type: VocabularyActionType.fetchRequest
  }),
  fetchSuccess: (vocabulary: VocabularyData): VocabularyAction => ({
    type: VocabularyActionType.fetchSuccess,
    payload: {
      vocabulary
    }
  }),
  fetchFailed: (): VocabularyAction => ({
    type: VocabularyActionType.fetchRequest
  }),
  addTranslation: (translation: Vocabulary): VocabularyAction => ({
    type: VocabularyActionType.addNewTranslation,
    payload: {
      translation
    }
  }),
  patchUpdateProgressStatus: (translation: Vocabulary): VocabularyAction => ({
    type: VocabularyActionType.patchUpdateProgressStatus,
    payload: {
      translation
    }
  }),
  deleteVocabularyRequest: () => ({
    type: VocabularyActionType.deleteVocabularyRequest
  }),
  deleteVocabularyRequestSuccess: (result: IDelete) => ({
    type: VocabularyActionType.deleteVocabularyRequestSuccess,
    payload: result
  }),
  deleteVocabularyRequestFailed: () => ({
    type: VocabularyActionType.deleteVocabularyRequestFailed
  }),
}

export enum VocabularyStatus {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface  Vocabulary {
  id: number,
  status: VocabularyStatus,
  translation_en: {
    id: number,
    text: string,
    translation: string
  }
}

export interface VocabularyData {
  vocabulary: Vocabulary[];
}

export interface VocabularyState {
  data: VocabularyData;
  loading: boolean;
}

const initialState: VocabularyState = {
  data: {
    vocabulary: []
  },
  loading: false,
}

const reducer = (state = initialState, action: VocabularyAction) => {
  switch (action.type) {
    case VocabularyActionType.fetchRequest: {
      state.loading = true
      break
    }
    case VocabularyActionType.fetchSuccess: {
      state.data.vocabulary = action.payload.vocabulary.vocabulary
      state.loading = false
      break
    }
    case VocabularyActionType.fetchFailed: {
      state.loading = false
      break
    }
    case VocabularyActionType.addNewTranslation: {
      state.data.vocabulary = [action.payload.translation, ...state.data.vocabulary]
      return state
    }
    case VocabularyActionType.patchUpdateProgressStatus: {
      const index = state.data.vocabulary.findIndex((a => a.id === action.payload.translation.id));
      const vocabulary = [...state.data.vocabulary]
      vocabulary[index] = action.payload.translation
      state.data.vocabulary = vocabulary
      break
    }
    case VocabularyActionType.deleteVocabularyRequest: {
      state.loading = true
      break
    }
    case VocabularyActionType.deleteVocabularyRequestSuccess: {
      state.loading = false;
      state.data.vocabulary = filter(state.data.vocabulary, ({ id }) => id !== action.payload.id)
      break
    }
    case VocabularyActionType.deleteVocabularyRequestFailed: {
      state.loading = false
      break
    }
    default:
      return state
  }
  return state
}
export default reducer
