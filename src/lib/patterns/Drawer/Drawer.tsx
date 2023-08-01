import type { FC } from 'react';
import React from 'react';
import { Drawer as DrawerTemplate } from '@mui/material';
import { capitalize } from '@mui/material/utils';
import Surface from '../../components/Surfaces/Surface';
import type { ButtonBaseProps } from '../../components/ButtonBase';
import type { DataAttributes } from '../../types/common';
import { useButtonBase } from '../../components/ButtonBase';
import Navigation from '../Navigations/Navigation';
import useStyles from './Drawer.styles';
import DrawerHeader from './DrawerHeader';

export interface CommonProps extends ButtonBaseProps {
  anchor: 'left' | 'right';
  open: boolean;
  onClose: () => void;
  className?: string;
  paperClassName?: string;
  closeButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

export interface CustomDrawer {
  disablePaddings?: boolean;
  width?: 'xs' | 'md';
}

export interface NavigationDrawer {
  disablePaddings: never;
  width: never;
}

export interface Logo {
  isLogo: boolean;
  heading?: never;
  onStartButtonClick?: never;
}

export interface Heading {
  heading: string;
  onStartButtonClick?: () => void;
  isLogo?: never;
}

export type DrawerProps = CommonProps & (CustomDrawer | NavigationDrawer) & (Logo | Heading);

const Drawer: FC<DrawerProps> = ({
  children,
  anchor = 'left',
  open,
  onClose,
  paperClassName,
  className,
  closeButtonProps,
  ...props
}) => {
  const { classes, cx } = useStyles();

  const heading = 'heading' in props && props.heading;
  const isDisablePaddings = 'disablePaddings' in props && props.disablePaddings;
  const width = 'width' in props && props.width;
  const onStartButtonClick = 'onStartButtonClick' in props ? props.onStartButtonClick : undefined;

  const widthClassName = width ? (classes as Record<string, string>)[`width${capitalize(width)}`] : classes.widthMd;

  const buttonBaseProps = useButtonBase(props);

  const renderDrawerHeader = () => {
    if (heading) {
      return (
        <DrawerHeader
          heading={heading}
          onStartButtonClick={onStartButtonClick}
          onClose={onClose}
          closeButtonProps={closeButtonProps}
        />
      );
    }
    return <DrawerHeader isLogo onClose={onClose} closeButtonProps={closeButtonProps} {...buttonBaseProps} />;
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.Children.count(children) === 1 && React.isValidElement(child) && child.type === Navigation) {
          return (
            <DrawerTemplate
              anchor={anchor}
              open={open}
              onClose={onClose}
              classes={{
                paper: cx(classes.paper, classes.paperNavigation, paperClassName),
              }}
            >
              {renderDrawerHeader()}
              <Surface color="100" className={cx(classes.disablePaddings, className)}>
                {children}
              </Surface>
            </DrawerTemplate>
          );
        }
        return (
          <DrawerTemplate
            anchor={anchor}
            open={open}
            onClose={onClose}
            classes={{
              paper: cx(classes.paper, widthClassName, paperClassName),
            }}
          >
            {renderDrawerHeader()}
            <Surface
              color="100"
              className={cx(
                { [classes.content]: !isDisablePaddings, [classes.disablePaddings]: isDisablePaddings },
                className
              )}
            >
              {children}
            </Surface>
          </DrawerTemplate>
        );
      })}
    </>
  );
};

export default Drawer;
