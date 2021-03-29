import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "../../../actions/profile";
import { VocabularyActions, IProfile } from "../../../store/profile";
import { ReduxState } from "../../../store";

export const Profile = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: ReduxState) => state.profile.data.profile);
  useEffect(() => {
    dispatch(VocabularyActions.fetchRequest());
    getProfile()
      .then((response: IProfile) => {
        dispatch(VocabularyActions.fetchSuccess(response));
      })
      .catch(error => {
        dispatch(VocabularyActions.fetchFailed());
      });
  }, []);

  return (
    <div>
      <div>
        Student name
        <span> - {username}</span>
      </div>
    </div>
  );
};
