import { combineReducers } from 'redux';

import vocabulary, { VocabularyState } from "./vocabulary";
import profile, { IProfileState } from "./profile"

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface ReduxState {
  vocabulary: VocabularyState,
  profile: IProfileState
}

export default combineReducers({
  vocabulary,
  profile,
})
