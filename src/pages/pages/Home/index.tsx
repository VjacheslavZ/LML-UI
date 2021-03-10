import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import { getVocabulary } from "../../../actions/vocabulary";
import { VocabularyActions, Vocabulary } from "../../../store/vocabulary";
import { MyVocabulary } from "./components/MyVocabulary";
import { AddWord } from "./components/AddWord";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VocabularyActions.fetchRequest());

    getVocabulary()
      .then((response: Vocabulary[]) => {
        dispatch(VocabularyActions.fetchSuccess({vocabulary: response}));
      })
      .catch(() => {
        dispatch(VocabularyActions.fetchFailed())
      });
  }, [])

  return (
    <div>
      <AddWord />
      <MyVocabulary />
    </div>
  )
}
