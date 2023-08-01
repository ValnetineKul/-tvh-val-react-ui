import type { FC } from 'react';
import React from 'react';
import { default as MuiTableHead } from '@mui/material/TableHead';
import useStyles from './TableHead.styles';

export interface TableHeadProps {
  className?: string;
}

const TableHead: FC<TableHeadProps> = ({ children, className }) => {
  const { classes } = useStyles();

  return (
    <MuiTableHead classes={{ root: classes.root }} className={className}>
      {children}
    </MuiTableHead>
  );
};

export default TableHead;
