import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
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
        dispatch(VocabularyActions.fetchSuccess({ vocabulary: response }));
      })
      .catch(() => {
        dispatch(VocabularyActions.fetchFailed());
      });
  }, [dispatch]);

  return (
    <div>
      <Button component={Link} to="/profile" variant="contained" color="primary">
        Profile
      </Button>
      <AddWord />
      <MyVocabulary />
    </div>
  );
};
