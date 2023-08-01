import React from 'react';
import type { ReactNode } from 'react';
import { useScreenSize } from '../../hooks';
import type { ListOptionProps } from '../ListOptionSelector';
import type { SwitchProps } from '../Switch';
import type { SegmentedControlProps } from '../SegmentedControl';
import ListOptionSelector from '../ListOptionSelector';
import Divider from '../Divider';
import SegmentedControl from '../SegmentedControl';
import Switch from '../Switch';
import useStyles from './Toolbar.styles';

export interface ToolbarProps<T, Multiple = undefined> {
  listOptions: ListOptionProps<T, Multiple>[];
  segmentedControl?: SegmentedControlProps;
  switches?: SwitchProps[];
  component?: ReactNode;
  className?: string;
  classNameComponent?: string;
}

function Toolbar<T, Multiple extends boolean | undefined = false>({
  listOptions,
  segmentedControl,
  switches,
  component,
  className,
  classNameComponent,
}: ToolbarProps<T, Multiple>): JSX.Element {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  return (
    <div className={cx(classes.root, className)}>
      {component && <div className={cx(classes.component, classNameComponent)}>{component}</div>}
      <ul className={classes.endContainer}>
        {switches &&
          switches.map((switchItem, index) => {
            return (
              <li key={index} className={classes.endContainerItem}>
                <Switch {...switchItem} />
                {isTabletUp && (index !== listOptions.length - 1 || listOptions.length > 0) && (
                  <Divider direction="vertical" className={classes.divider} />
                )}
              </li>
            );
          })}
        {listOptions.map((listOption, index) => {
          return (
            <li key={index} className={classes.endContainerItem}>
              <ListOptionSelector
                {...listOption}
                buttonProps={listOption.buttonProps}
                options={listOption.options.map((option) => {
                  return {
                    label: option.label,
                    value: option.value,
                    buttonProps: option.buttonProps,
                    checkboxProps: option.checkboxProps,
                  };
                })}
              />
              {isTabletUp && (index !== listOptions.length - 1 || segmentedControl) && (
                <Divider direction="vertical" className={classes.divider} />
              )}
            </li>
          );
        })}
        {segmentedControl && (
          <li>
            <SegmentedControl {...segmentedControl} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Toolbar;
