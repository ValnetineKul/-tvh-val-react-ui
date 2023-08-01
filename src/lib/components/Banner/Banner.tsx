import type { FC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { capitalize } from '@mui/material/utils';
import Typography from '../Typography';
import type { BANNER_STATUSES } from './constants';
import useStyles from './Banner.styles';
import type { DataAttributes, ObjectValuesUnion } from '../../types/common';
import Alert from '../Alert';

type Status = ObjectValuesUnion<typeof BANNER_STATUSES>;

export interface BannerProps {
  status: Status;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  containerClassName?: string;
  message: string | React.ReactNode;
  button?: React.ReactElement;
  direction?: 'horizontal' | 'vertical';
  closeButtonProps?: DataAttributes;
}

const Banner: FC<BannerProps> = ({
  status,
  closable = false,
  onClose,
  className,
  containerClassName,
  message,
  button,
  direction = 'horizontal',
  closeButtonProps,
}) => {
  const { classes, cx } = useStyles();
  const [isMultiline, setIsMultiline] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const directionClassName = (classes as Record<string, string>)[`direction${capitalize(direction)}`];

  useEffect(() => {
    const isBeingMultiline = () => {
      const isMulti =
        direction === 'horizontal' && messageRef && messageRef.current && messageRef.current.clientHeight > 24;
      setIsMultiline(!!isMulti);
    };

    isBeingMultiline();

    window.addEventListener('resize', isBeingMultiline);
    return () => {
      window.removeEventListener('resize', isBeingMultiline);
    };
  }, [message, direction]);

  const renderChildren = () => {
    if (typeof message === 'string') {
      return (
        <Typography className={classes.typography} component="div" ref={messageRef}>
          {message}
        </Typography>
      );
    }

    return <div ref={messageRef}>{message}</div>;
  };

  const renderTertiaryAction = () => {
    if (button) {
      return React.cloneElement(button, {
        size: 'sm',
        variant: 'tertiary',
        surfaceClassName: classes.actionButton,
      });
    }
    return null;
  };

  const renderAction = () => {
    return direction === 'horizontal' ? renderTertiaryAction() : undefined;
  };

  const renderMessage = () => {
    return (
      <div className={cx(classes.messageBox, classes.messageBoxHorizontal)}>
        {renderChildren()}
        {direction === 'vertical' && renderTertiaryAction()}
      </div>
    );
  };

  return (
    <Alert
      status={status}
      action={renderAction()}
      containerClassName={cx(classes.root, directionClassName, containerClassName)}
      className={cx(classes.banner, className, { [classes.bannerMultiline]: isMultiline })}
      classesOverrides={{ message: classes.message, action: classes.action }}
      surfaceClassName={classes.surface}
      message={renderMessage()}
      onClose={onClose}
      closable={closable}
      closeButtonProps={closeButtonProps}
    />
  );
};
export default Banner;
