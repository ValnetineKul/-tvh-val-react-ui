import { default as MuiDialogContent } from '@mui/material/DialogContent';
import type { FC } from 'react';
import React from 'react';
import useStyles from './DialogContent.styles';

const DialogContent: FC = ({ children }) => {
  const { classes } = useStyles();

  return <MuiDialogContent className={classes.root}>{children}</MuiDialogContent>;
};

export default DialogContent;
