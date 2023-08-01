import type { FC } from 'react';
import React from 'react';
import Button from '../Button';
import Divider from '../../Divider';
import Surface from '../../Surfaces/Surface';
import { AngleDown } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './SplitButton.styles';
import type { DataAttributes } from '../../../types/common';

interface CommonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'md' | 'lg';
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDropdownClick?: React.MouseEventHandler<HTMLButtonElement>;
}
interface WithLabel {
  label: string;
  icon?: never;
}

interface WithIcon {
  icon: React.ReactElement;
  label?: never;
}

export type SplitButtonProps = CommonProps &
  (WithLabel | WithIcon) & {
    buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
    dropdownButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  };

const SplitButton: FC<SplitButtonProps> = ({
  disabled = false,
  fullWidth = false,
  size = 'md',
  isLoading = false,
  onClick,
  onDropdownClick,
  buttonProps,
  dropdownButtonProps,
  label: textLabel = '',
  icon: iconLabel = '',
}) => {
  const { classes, cx } = useStyles();

  return (
    <div role="group" className={cx(classes.root, { [classes.fullWidth]: fullWidth })}>
      <Button
        disabled={disabled}
        size={size}
        onClick={onClick}
        variant="primary"
        label={textLabel || iconLabel}
        isLoading={isLoading}
        fullWidth
        {...buttonProps}
      />
      <Surface color="Primary" className={classes.divider}>
        <Divider direction="vertical" />
      </Surface>

      <Button
        data-testid="toggle-dropdown"
        {...dropdownButtonProps}
        disabled={disabled}
        size={size}
        className={classes.button}
        onClick={onDropdownClick}
        variant="primary"
        label={<Icon icon={AngleDown} />}
      />
    </div>
  );
};

export default SplitButton;
