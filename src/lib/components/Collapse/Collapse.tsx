import React from 'react';
import type { FC } from 'react';
import { default as MuiCollapse } from '@mui/material/Collapse';

export interface CollapseProps {
  open: boolean;
  className?: string;
  children: React.ReactNode;
  collapsedSize?: string | number;
}

const Collapse: FC<CollapseProps> = ({ collapsedSize, open = false, className, children }) => {
  return (
    <MuiCollapse in={open} collapsedSize={collapsedSize} className={className}>
      {children}
    </MuiCollapse>
  );
};

export default Collapse;
