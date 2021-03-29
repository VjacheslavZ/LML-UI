import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  makeStyles,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHead
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";

import { ReduxState } from "../../../../../store";
import { VocabularyActions, VocabularyStatus, IDelete } from "../../../../../store/vocabulary";
import { vocabularyUpdateStatus, deleteVocabulary } from "../../../../../actions/vocabulary";

const useStyles = makeStyles({
  table: {
    maxWidth: 800
  },
  hover: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export const MyVocabulary = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const vocabulary = useSelector((state: ReduxState) => state.vocabulary.data.vocabulary);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vocab_id = (e.currentTarget as HTMLSpanElement).getAttribute("data-id");

    if (vocab_id) {
      dispatch(VocabularyActions.deleteVocabularyRequest());
      deleteVocabulary(vocab_id)
        .then((response: IDelete) => {
          dispatch(VocabularyActions.deleteVocabularyRequestSuccess(response));
        })
        .catch(() => {
          dispatch(VocabularyActions.deleteVocabularyRequestFailed());
        });
    }
  };

  const handleChangeStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const status = (e.currentTarget as HTMLSpanElement).getAttribute("data-status");
    const vocab_id = (e.currentTarget as HTMLSpanElement).getAttribute("data-id");

    if (vocab_id) {
      const updateStatus = (status: VocabularyStatus) => {
        vocabularyUpdateStatus(vocab_id, status)
          .then(response => {
            console.log("response", response);
            dispatch(VocabularyActions.patchUpdateProgressStatus(response));
          })
          .catch(error => console.log("handleChangeStatus error", error));
      };

      if (status === VocabularyStatus.WAITING) {
        updateStatus(VocabularyStatus.IN_PROGRESS);
      }
      if (status === VocabularyStatus.IN_PROGRESS) {
        updateStatus(VocabularyStatus.DONE);
      }
      if (status === VocabularyStatus.DONE) {
        updateStatus(VocabularyStatus.WAITING);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>English</TableCell>
            <TableCell align="right">Russian</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {vocabulary.map(({ id, status, translation_en }) => (
            <TableRow key={`${id}_${status}`}>
              <TableCell component="th" scope="row">
                {translation_en.text}
              </TableCell>
              <TableCell align="right">{translation_en.translation}</TableCell>
              <TableCell align="right">
                <span
                  className={classes.hover}
                  onClick={handleChangeStatus}
                  data-status={status}
                  data-id={id}
                >
                  {status === "WAITING" ? (
                    <AccessTimeIcon />
                  ) : status === "IN_PROGRESS" ? (
                    <DonutLargeIcon />
                  ) : (
                    <CheckCircleIcon />
                  )}
                </span>
              </TableCell>
              <TableCell>
                <DeleteIcon data-id={id} className={classes.hover} onClick={handleDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
