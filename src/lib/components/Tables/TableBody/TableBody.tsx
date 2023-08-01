import type { FC } from 'react';
import React, { useState } from 'react';
import type { TableBodyProps } from '@mui/material/TableBody';
import { default as MuiTableBody } from '@mui/material/TableBody';

const TableBody: FC<TableBodyProps> = ({ children, ...props }) => {
  const [isAnyRowEditing, setIsAnyRowEditing] = useState(false);

  const content = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { isAnyRowEditing, setIsAnyRowEditing });
    }
    return null;
  });

  return <MuiTableBody {...props}>{content}</MuiTableBody>;
};
export default TableBody;
