import { ReduxAction } from './index'
// import {VocabularyAction, VocabularyData, VocabularyState} from "./vocabulary";
// import {VocabularyAction, VocabularyActionType, VocabularyData} from "./vocabulary";

export enum ProfileActionType {
  fetchRequest = 'profile/FetchRequest',
  fetchSuccess = 'profile/FetchSuccess',
  fetchFailed = 'profile/FetchFailed',
}

export type ProfileAction =
  | ProfileFetchRequest
  | ProfileFetchSuccess
  | ProfileFetchFailed

/* Actions interface start */
// Profile
interface ProfileFetchRequest extends ReduxAction {
  type: ProfileActionType.fetchRequest;
}
interface ProfileFetchSuccess extends ReduxAction {
  type: ProfileActionType.fetchSuccess;
  payload: IProfile
}
interface ProfileFetchFailed extends ReduxAction {
  type: ProfileActionType.fetchFailed;
}
/* Actions interface end */

export interface IProfile {
  username: string;
}

export interface IProfileData {
  profile: IProfile
}

export const VocabularyActions = {
  fetchRequest: (): ProfileAction => ({
    type: ProfileActionType.fetchRequest
  }),
  fetchSuccess: (profile: IProfile): ProfileAction => ({
    type: ProfileActionType.fetchSuccess,
    payload: profile
  }),
  fetchFailed: (): ProfileAction => ({
    type: ProfileActionType.fetchRequest
  }),
}

export interface IProfileState {
  data: IProfileData;
  loading: boolean;
}

const initialState: IProfileState = {
  data: {
    profile: {
      username: '',
    }
  },
  loading: false,
}

const reducer = (state = initialState, action: ProfileAction) => {
  switch (action.type) {
    case ProfileActionType.fetchRequest: {
      state.loading = true
      break
    }
    case ProfileActionType.fetchSuccess: {
      state.loading = false
      console.log('action.payload', action.payload)
      state.data.profile = action.payload
      break
    }
    case ProfileActionType.fetchFailed: {
      state.loading = false
      break
    }
    default:
      return state
  }
  return state
}

export default reducer
