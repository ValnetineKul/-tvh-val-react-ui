import { default as MuiTabItem } from '@mui/material/Tab';
import { default as MuiTabs } from '@mui/material/Tabs';
import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import Typography from '../Typography';
import Surface from '../Surfaces/Surface';
import Divider from '../Divider';
import Badge from '../Badge';
import TabNavigationScrollButton from './TabNavigationScrollButton';
import type { DataAttributes } from '../../types/common';
import useStyles from './TabNavigation.styles';

interface TabListItem {
  id: string;
  label: ReactNode;
  component: ReactNode;
  count?: number;
  itemProps?: DataAttributes;
}

export interface TabNavigationProps {
  tabList: TabListItem[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  className?: string;
  contentClassName?: string;
  tabClassName?: string;
}

const TabNavigation: FC<TabNavigationProps> = ({
  tabList,
  className,
  activeTab,
  onTabChange,
  contentClassName,
  tabClassName,
}) => {
  const { classes, cx } = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!!activeTab && typeof activeTab === 'string') {
      const index = tabList.findIndex((tab) => tab.id === activeTab);
      if (index === -1) return;
      setValue(index);
    }
  }, [activeTab, tabList]);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    if (tabList[newValue] && onTabChange) {
      onTabChange(tabList[newValue].id);
    }

    setValue(newValue);
  };

  const renderLabel = (label: ReactNode, isSelected: boolean) => {
    return (
      <Typography component="span" weight={isSelected ? ('emphasis' as const) : ('regular' as const)}>
        {label}
      </Typography>
    );
  };

  const renderTabItems = ({ label, count, itemProps }: TabListItem, key: number) => {
    const isSelected = value === key;

    return (
      <MuiTabItem
        id={`tabItem-${key}`}
        aria-controls={`tabContent-${key}`}
        key={key}
        label={
          <>
            {isSelected && (
              <Divider direction="vertical" className={cx(classes.verticalDivider, classes.verticalDividerLeft)} />
            )}
            {count ? (
              <Badge count={count || 0} variant="default">
                {renderLabel(label, isSelected)}
              </Badge>
            ) : (
              renderLabel(label, isSelected)
            )}
            {isSelected && (
              <Divider direction="vertical" className={cx(classes.verticalDivider, classes.verticalDividerRight)} />
            )}
          </>
        }
        classes={{
          root: cx(classes.tab, tabClassName),
          selected: classes.tabSelected,
        }}
        {...itemProps}
      />
    );
  };

  const renderTabContent = ({ component }: TabListItem, key: number) => {
    return (
      <div
        id={`tabContent-${key}`}
        key={key}
        className={cx(classes.tabContent, contentClassName)}
        role="tabpanel"
        aria-labelledby={`tabItem-${key}`}
        hidden={value !== key}
        tabIndex={0}
      >
        {component}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className={classes.tabContainer}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.root,
            indicator: classes.indicator,
            scrollButtons: classes.scrollButtons,
          }}
          variant="scrollable"
          scrollButtons="auto"
          ScrollButtonComponent={({ orientation, ...restProps }) => <TabNavigationScrollButton {...restProps} />}
        >
          {tabList.map(renderTabItems)}
        </MuiTabs>
        <Divider className={classes.bottomDivider} />
      </div>
      <Surface color="100">{tabList.map(renderTabContent)}</Surface>
    </div>
  );
};

export default TabNavigation;
