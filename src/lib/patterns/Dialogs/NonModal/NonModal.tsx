import type { FC } from 'react';
import React from 'react';
import Slide from '@mui/material/Slide';
import { default as SurfaceComponent } from '../../../components/Surfaces/Surface';
import useStyles from './NonModal.styles';
import IconButton from '../../../components/Buttons/IconButton';
import Icon from '../../../components/Icon';
import { Times } from '../../../components/Icon/icons/functional';
import { ARIA_CLOSE_DIALOG } from '../Modal';
import Typography from '../../../components/Typography';

export interface NonModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  position?: 'bottom-start' | 'bottom-end' | 'unset';
  priority?: 'normal' | 'high';
  title?: string | React.ReactNode;
}

const NonModal: FC<NonModalProps> = ({
  className,
  isOpen,
  onClose,
  position = 'bottom-start',
  priority = 'normal',
  title,
  children,
}) => {
  const { classes, cx } = useStyles();

  const positionClassName = position === 'bottom-start' ? classes.positionBottomStart : classes.positionBottomEnd;

  const renderTitle = () => {
    return typeof title === 'string' ? (
      <Typography variant="h4" className={classes.titleText}>
        {title}
      </Typography>
    ) : (
      title
    );
  };

  const renderTitleRow = () => {
    return (
      <div className={classes.title}>
        <div>{title && renderTitle()}</div>
        {onClose && (
          <IconButton
            className={classes.closeButton}
            size="md"
            onClick={onClose}
            icon={<Icon icon={Times} />}
            aria-label={ARIA_CLOSE_DIALOG}
          />
        )}
      </div>
    );
  };

  return (
    <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
      <SurfaceComponent
        role="dialog"
        className={cx(classes.root, { [positionClassName]: position !== 'unset' }, className)}
        color={priority === 'normal' ? '100' : 'Secondary'}
      >
        {(!!title || onClose) && renderTitleRow()}
        <div className={classes.children}>{children}</div>
      </SurfaceComponent>
    </Slide>
  );
};

export default NonModal;
