import type { FC, ReactNode, ReactElement, MouseEventHandler } from 'react';
import React from 'react';
import type { DataAttributes } from '../../types/common';
import Surface from '../../components/Surfaces/Surface';
import useStyles from './FloatingBar.styles';
import Divider from '../../components/Divider';
import Button from '../../components/Buttons/Button';

export interface FloatingBarProps {
  label: ReactNode;
  actions: ReactElement;
  className?: string;
  onClearSelection?: MouseEventHandler<HTMLButtonElement>;
  clearSelectionButtonLabel?: string;
  clearSelectionButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const FloatingBar: FC<FloatingBarProps> = ({
  label,
  actions,
  className,
  onClearSelection,
  clearSelectionButtonLabel = 'Deselect all',
  clearSelectionButtonProps,
}) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Surface color="100" className={classes.floatingBar} border>
        <div className={classes.label}>
          {label}
          {onClearSelection && (
            <div className={classes.clearSelectionWrapper}>
              <Divider direction="vertical" className={classes.divider} />
              <Button
                variant="link"
                label={clearSelectionButtonLabel}
                onClick={onClearSelection}
                {...clearSelectionButtonProps}
              />
            </div>
          )}
        </div>
        <div className={classes.actionsWrapper}>{actions}</div>
      </Surface>
    </div>
  );
};

export default FloatingBar;
