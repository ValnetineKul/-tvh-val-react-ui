import type { FC } from 'react';
import React, { useState, useEffect, useRef, createContext } from 'react';
import { default as MuiTable } from '@mui/material/Table';
import TableContainer from './TableContainer';
import useStyles from './Table.styles';
import type { TableShadows } from './Table.types';

export interface TableProps {
  disabledStickyHeader?: boolean;
  tableContainerClassName?: string;
  className?: string;
  children: React.ReactNode;
}

const shadows: TableShadows = {
  shouldShowHeaderShadow: false,
  shouldShowVerticalShadowStart: false,
  shouldShowVerticalShadowEnd: false,
  rightShadowOffset: 0,
};

export const ShadowsContext = createContext(shadows);

const Table: FC<TableProps> = ({ disabledStickyHeader = false, tableContainerClassName, className, children }) => {
  const [shadowsShown, setShadowsShown] = useState(shadows);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);
  const { classes, cx } = useStyles({
    rightShadowOffset: tableWidth,
    verticalOffset: tableHeight,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) {
        return;
      }
      const { scrollTop, scrollWidth, scrollLeft, clientWidth, clientHeight } = ref.current;
      setShadowsShown({
        shouldShowHeaderShadow: scrollTop > 0,
        shouldShowVerticalShadowStart: scrollLeft > 0,
        shouldShowVerticalShadowEnd: Math.ceil(scrollLeft) + clientWidth < scrollWidth,
        rightShadowOffset: clientWidth,
      });
      setTableWidth(clientWidth);
      setTableHeight(clientHeight);
    };
    onScroll();
    const node = ref.current;
    if (node) {
      node.addEventListener('scroll', onScroll);
    }
    window.addEventListener('resize', onScroll);
    return () => {
      if (node) {
        node.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const renderShadows = () => {
    return (
      <>
        {shadowsShown.shouldShowHeaderShadow && (
          <div className={cx(classes.headerShadow, { [classes.disabledStickyHeaderShadow]: disabledStickyHeader })} />
        )}
        {shadowsShown.shouldShowVerticalShadowStart && (
          <div className={cx(classes.verticalShadow, classes.startShadow)} />
        )}
        {shadowsShown.shouldShowVerticalShadowEnd && <div className={cx(classes.verticalShadow, classes.endShadow)} />}
      </>
    );
  };

  return (
    <ShadowsContext.Provider value={shadowsShown}>
      <TableContainer className={tableContainerClassName} ref={ref}>
        {renderShadows()}
        <MuiTable stickyHeader={!disabledStickyHeader} className={cx(className, classes.root)}>
          {children}
        </MuiTable>
      </TableContainer>
    </ShadowsContext.Provider>
  );
};

export default Table;
