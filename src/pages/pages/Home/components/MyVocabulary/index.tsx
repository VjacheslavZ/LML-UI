import React from "react";
import { useSelector } from 'react-redux';
import {
  Paper,
  makeStyles,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHead,
} from "@material-ui/core";

import { ReduxState } from "../../../../../store";

const useStyles = makeStyles({
  table: {
    maxWidth: 800,
  },
});

export const MyVocabulary = () => {
  const classes = useStyles();
  const vocabulary = useSelector((state: ReduxState) => state.vocabulary.data.vocabulary)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>English</TableCell>
            <TableCell align="right">Russian</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {vocabulary.map(({id, isDone, translation_en}) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {translation_en.text}
              </TableCell>
              <TableCell align="right">{translation_en.translation}</TableCell>
              <TableCell align="right">{isDone ? <span>learned</span> : <span>In progress</span>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
