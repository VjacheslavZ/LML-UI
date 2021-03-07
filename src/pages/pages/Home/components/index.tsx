import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {ReduxState} from "../../../../store";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";

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
