import DialogActions from '@mui/material/DialogActions';

import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import useScreenSize from '../../../hooks/useScreenSize';
import Divider from '../../../components/Divider';
import Button from '../../../components/Buttons/Button';
import type { ButtonBaseProps } from '../../../components/ButtonBase';
import { useButtonBase } from '../../../components/ButtonBase';
import useStyles from './DialogFooter.styles';
import type { DataAttributes } from '../../../types/common';

type Direction = 'horizontal' | 'vertical';
export interface DialogFooterProps extends ButtonBaseProps {
  direction?: Direction;
  actionButtons: React.ReactElement[];
  alternativeAction?: string;
  onAlternativeActionClick?: () => void;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
}

const DialogFooter: FC<DialogFooterProps> = ({
  direction: directionProp,
  actionButtons,
  alternativeAction,
  onAlternativeActionClick,
  buttonProps,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const buttonBaseProps = useButtonBase(props);
  const { isTabletUp } = useScreenSize('Tablet');

  const direction = ((): Direction => {
    if (directionProp) return directionProp;
    return isTabletUp ? 'horizontal' : 'vertical';
  })();

  const directionClassName = (classes as Record<string, string>)[`direction${capitalize(direction)}`];
  const alternativeActionClassName = (classes as Record<string, string>)[`alternativeAction${capitalize(direction)}`];

  return (
    <>
      <Divider direction="horizontal" />
      <DialogActions className={classes.wrapper}>
        <ul className={cx(classes.list, directionClassName)}>
          {actionButtons.map((item: React.ReactElement, key) => (
            <li className={classes.listItem} key={key}>
              {direction === 'horizontal' ? item : React.cloneElement(item, { fullWidth: true })}
            </li>
          ))}
          {alternativeAction && (
            <li className={alternativeActionClassName}>
              <Button
                label={alternativeAction}
                variant="link"
                onClick={onAlternativeActionClick}
                {...buttonBaseProps}
                {...buttonProps}
              />
            </li>
          )}
        </ul>
      </DialogActions>
    </>
  );
};

export default DialogFooter;
