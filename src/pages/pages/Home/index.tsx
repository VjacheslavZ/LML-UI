import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { getVocabulary } from "../../../actions/vocabulary";
import { VocabularyActions, Vocabulary } from "../../../store/vocabulary";
import { MyVocabulary } from "./components";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VocabularyActions.fetchRequest());

    getVocabulary()
      .then((responce: Vocabulary[]) => {
        dispatch(VocabularyActions.fetchSuccess({vocabulary: responce}));
      })
      .catch(() => {
        dispatch(VocabularyActions.fetchFailed())
      });
  }, [])

  return (
    <div>
      <MyVocabulary />
    </div>
  )
}
