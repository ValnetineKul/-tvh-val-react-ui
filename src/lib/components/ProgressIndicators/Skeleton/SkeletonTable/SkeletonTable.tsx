import type { FC } from 'react';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useSurface } from '../../../../../themes/core';
import Table from '../../../Tables/Table';
import TableHead from '../../../Tables/TableHead/TableHead';
import TableBody from '../../../Tables/TableBody/TableBody';
import TableRow from '../../../Tables/TableRow/TableRow';
import TableCell from '../../../Tables/TableCell/TableCell';
import useStyles from './SkeletonTable.styles';

export interface SkeletonTableProps {
  rows: number;
  cols: number;
  isFirstColumnNarrow?: boolean;
}

const SkeletonTable: FC<SkeletonTableProps> = ({ rows, cols, isFirstColumnNarrow = false }) => {
  const { color: onSurface } = useSurface();
  const { classes } = useStyles({ onSurface });

  return (
    <div data-testid="skeleton-table">
      <Table>
        <TableHead>
          <TableRow>
            {new Array(cols).fill(null).map((col, i) => (
              <TableCell key={i} className={i === 0 && isFirstColumnNarrow ? classes.narrowColumn : ''}>
                <Skeleton variant="rectangular" className={classes.tableHead} animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {new Array(rows).fill(null).map((row, i) => (
            <TableRow key={i}>
              {new Array(cols).fill(null).map((col, j) => (
                <TableCell key={j} className={j === 0 && isFirstColumnNarrow ? classes.narrowColumn : ''}>
                  <Skeleton variant="rectangular" className={classes.tableBody} animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkeletonTable;
