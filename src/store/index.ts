import { combineReducers } from 'redux';

import vocabulary, { VocabularyState } from "./vocabulary";

export interface ReduxState {
  vocabulary: VocabularyState
}

export default combineReducers({
  vocabulary,
})
