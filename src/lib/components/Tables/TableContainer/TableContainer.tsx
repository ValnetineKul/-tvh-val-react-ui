import React, { forwardRef } from 'react';
import { default as MuiTableContainer } from '@mui/material/TableContainer';
import useStyles from './TableContainer.styles';
import Surface from '../../Surfaces/Surface';

export interface TableContainerProps {
  className?: string;
  children: React.ReactNode;
}

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(({ children, className }, ref) => {
  const { classes, cx } = useStyles();

  return (
    <MuiTableContainer className={cx(className, classes.root)} color="100" ref={ref} component={Surface}>
      {children}
    </MuiTableContainer>
  );
});
TableContainer.displayName = 'TableContainer';

export default TableContainer;
