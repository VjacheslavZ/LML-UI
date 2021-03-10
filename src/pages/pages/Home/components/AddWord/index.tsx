import React, { useState }  from "react";
import { List, ListItem, ListItemText, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getTranslations } from "../../../../../actions/translation";
import { vocabularyAdd } from "../../../../../actions/vocabulary";
import { ITranslation } from '../../../../../actions/translation'
import { VocabularyActions } from "../../../../../store/vocabulary";

export const AddWord = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState<string>('')
  const [translation, setTranslation] = useState<ITranslation>({
    id: 0,
    text: '',
    translation: '',
  })

  const fetchTranslations = async () => {
    try {
      const response = await getTranslations(text)
      setTranslation(response)
    } catch (error) {}
  }
  const fetchVocabularyAdd = async () => {
    try {
      const response = await vocabularyAdd(translation.id)

      if (response.id) {
        dispatch(VocabularyActions.addTranslation(response))
        setTranslation({
          ...translation,
          translation: '',
          text: '',
        })
      }
    } catch (err) {}
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTranslations()
  }

  const translationResult = `${translation.text} - ${translation.translation}`;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Search"
          name="text"
          value={text}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Get translations
        </Button>
      </form>

      <List component="nav" aria-label="results">
        {translation.translation && (
          <ListItem button id={(translation.id).toString()} onClick={fetchVocabularyAdd}>
            <ListItemText primary={translationResult} />
          </ListItem>
        )}
      </List>
    </div>
  )
}
