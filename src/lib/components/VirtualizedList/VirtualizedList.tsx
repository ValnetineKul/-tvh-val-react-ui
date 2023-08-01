import React, { useEffect, useRef, useState } from 'react';
import type { ListChildComponentProps } from 'react-window';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import useScreenSize from '../../hooks/useScreenSize';
import useStyles from './VirtualizedList.styles';

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

interface RowProps extends ListChildComponentProps {
  containerPadding: number;
  isTabletUp: boolean;
  setRowHeight: (index: number, size: number) => void;
}

const Row = (props: RowProps) => {
  const { data, index, style, containerPadding, isTabletUp, setRowHeight } = props;
  const { classes } = useStyles();

  const rowRef = useRef<HTMLDivElement>(null);
  const row = data[index];
  const { children: rowChildren, ...rowProps } = row.props;
  const { width, ...styleWithoutWidth } = style;
  const top = isTabletUp ? (style.top as number) + containerPadding : style.top;
  const inlineStyle = {
    ...styleWithoutWidth,
    top,
    maxWidth: '100%',
  };

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(index, rowRef.current.clientHeight);
    }
    // eslint-disable-next-line
  }, [rowRef]);

  if (row.type === 'li') {
    return (
      <li style={inlineStyle} className={classes.row} {...rowProps}>
        <div ref={rowRef}>{rowChildren}</div>
      </li>
    );
  }
  return (
    <li style={inlineStyle} className={classes.row}>
      {React.cloneElement(row, { elementType: 'div', ref: rowRef })}
    </li>
  );
};

export interface VirtualizedListProps extends React.HTMLAttributes<HTMLElement> {
  listboxClassName?: string;
  visibleItemsCount?: number;
  defaultItemSize?: number;
  containerPadding?: number;
  overscanCount?: number;
  mobileListheight?: number;
}

const VirtualizedList = React.forwardRef<HTMLDivElement, VirtualizedListProps>(
  (
    {
      children,
      className,
      listboxClassName,
      visibleItemsCount = 7,
      defaultItemSize = 48,
      containerPadding = 8,
      overscanCount = 5,
      mobileListheight,
      ...other
    },
    ref
  ) => {
    const { classes, cx } = useStyles();
    const { isTabletUp } = useScreenSize('Tablet');
    const [listHeight, setListHeight] = useState(0);

    const listRef = useRef<VariableSizeList>(null);
    const rowHeights = useRef<Record<string, number>>({});

    const itemData = React.Children.toArray(children);
    const itemCount = React.Children.count(children);

    const getRowHeight = (index: number) => {
      if (!rowHeights?.current) return defaultItemSize;
      return rowHeights.current[index] || defaultItemSize;
    };

    const setRowHeight = (index: number, size: number) => {
      if (listRef.current) {
        listRef.current.resetAfterIndex(0);
        rowHeights.current = { ...rowHeights.current, [index]: size };
      }
    };

    useEffect(() => {
      if (!isTabletUp) return;

      if (itemCount > visibleItemsCount) {
        setListHeight(visibleItemsCount * defaultItemSize);
      } else {
        let height = 0;

        for (let i = 0; i < itemCount; i++) {
          height += getRowHeight(i);
        }

        setListHeight(height + 2 * containerPadding);
      }
      // eslint-disable-next-line
    }, [itemCount, rowHeights]);

    const getListHeight = (autoSizerHeight: number) => {
      if (isTabletUp) return listHeight;
      if (mobileListheight) return mobileListheight;
      return autoSizerHeight;
    };

    return (
      <div ref={ref} className={cx(listboxClassName && !isTabletUp ? listboxClassName : null)}>
        <AutoSizer disableWidth disableHeight={isTabletUp || !!mobileListheight} className={classes.autosizer}>
          {({ height }) => {
            return (
              <OuterElementContext.Provider value={other}>
                <VariableSizeList
                  ref={listRef}
                  className={cx(classes.root, className)}
                  itemData={itemData}
                  height={getListHeight(height)}
                  width="100%"
                  innerElementType="ul"
                  itemSize={getRowHeight}
                  overscanCount={overscanCount}
                  itemCount={itemCount}
                  outerElementType={OuterElementType}
                >
                  {(rowProps) => (
                    <Row
                      {...rowProps}
                      isTabletUp={isTabletUp}
                      containerPadding={containerPadding}
                      setRowHeight={setRowHeight}
                    />
                  )}
                </VariableSizeList>
              </OuterElementContext.Provider>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
);
VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
