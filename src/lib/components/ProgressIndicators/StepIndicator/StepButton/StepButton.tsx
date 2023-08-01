import type { FC, MouseEventHandler } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import StepLabel from '@mui/material/StepLabel';
import { default as MuiStepButton } from '@mui/material/StepButton';
import type { StepIconProps } from '@mui/material/StepIcon';
import Surface from '../../../Surfaces/Surface';
import { Check } from '../../../Icon/icons/functional';
import Icon from '../../../Icon';
import Typography from '../../../Typography';
import Tooltip from '../../../Tooltip';
import type { ButtonBaseProps } from '../../../ButtonBase';
import { useButtonBase } from '../../../ButtonBase';
import useStyles from './StepButton.styles';

export interface StepButtonProps extends ButtonBaseProps {
  label: string;
  hiddenLabel?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}

const StepButton: FC<StepButtonProps> = ({ label, hiddenLabel = false, onClick, className, ...props }) => {
  const { classes, cx } = useStyles();

  const labelRef = useRef<HTMLSpanElement>(null);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);

  useEffect(() => {
    const compareSize = () => {
      setShouldShowTooltip(
        !!(label && labelRef && labelRef.current && labelRef.current.scrollWidth > labelRef.current.clientWidth)
      );
    };

    compareSize();

    window.addEventListener('resize', compareSize);
    return () => {
      window.removeEventListener('resize', compareSize);
    };
  }, [label]);

  const buttonBaseProps = useButtonBase(props);

  const StepIconComponent = ({ active, completed, icon }: StepIconProps) => {
    const renderInnerComponent = () => {
      return completed ? (
        <Icon icon={Check} size="sm" />
      ) : (
        <Typography variant="body300" weight="emphasis" component="span">
          {icon}
        </Typography>
      );
    };

    if (active || completed) {
      return (
        <Surface color="Primary" className={classes.icon}>
          {renderInnerComponent()}
        </Surface>
      );
    }

    return <span className={cx(classes.icon, classes.disapledIcon)}>{renderInnerComponent()}</span>;
  };

  return (
    <Tooltip
      label={label}
      disableHoverListener={!shouldShowTooltip}
      className={cx(classes.truncatedLabel, classes.tooltip, { [classes.hiddenLabel]: hiddenLabel })}
    >
      <MuiStepButton onClick={onClick} className={cx(classes.stepButton, className)} {...buttonBaseProps}>
        <StepLabel
          StepIconComponent={StepIconComponent}
          classes={{
            root: classes.rootLabel,
            label: classes.label,
            iconContainer: classes.iconContainer,
            labelContainer: classes.labelContainer,
            alternativeLabel: classes.alternativeLabel,
          }}
        >
          {!hiddenLabel && (
            <Typography variant="body400" component="span" ref={labelRef} className={classes.truncatedLabel}>
              {label}
            </Typography>
          )}
        </StepLabel>
      </MuiStepButton>
    </Tooltip>
  );
};
export default StepButton;
