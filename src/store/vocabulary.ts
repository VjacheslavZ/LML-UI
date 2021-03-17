export interface ReduxAction {
  type: string;
  payload?: any;
}

export enum VocabularyActionType {
  fetchRequest = 'vocabulary/FetchRequest',
  fetchSuccess = 'vocabulary/FetchSuccess',
  fetchFailed = 'vocabulary/FetchFailed',
  addNewTranslation = 'vocabulary/AddNewTranslation',
  patchUpdateProgressStatus = 'vocabulary/PatchUpdateProgressStatus',
}

export type VocabularyAction =
  | VocabularyFetchRequest
  | VocabularyFetchSuccess
  | VocabularyFetchFailed
  | AddNewTranslation
  | PatchUpdateProgressStatus

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
interface AddNewTranslation extends ReduxAction {
  type: VocabularyActionType.addNewTranslation;
  payload: {
    translation: Vocabulary;
  }
}
interface PatchUpdateProgressStatus extends ReduxAction {
  type: VocabularyActionType.patchUpdateProgressStatus;
  payload: {
    translation: Vocabulary;
  }
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
  })
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

export default (state = initialState, action: VocabularyAction) => {
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
    default:
      return state
  }
  return state
}
