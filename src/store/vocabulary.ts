export interface ReduxAction {
  type: string;
  payload?: any;
}

export enum VocabularyActionType {
  fetchRequest = 'vocabulary/FetchRequest',
  fetchSuccess = 'vocabulary/FetchSuccess',
  fetchFailed = 'vocabulary/FetchFailed',
}

export type VocabularyAction =
  | VocabularyFetchRequest
  | VocabularyFetchSuccess
  | VocabularyFetchFailed

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
}

export interface  Vocabulary {
  id: number,
  isDone: boolean,
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
  }
  return state;
}
