import { default as MuiDialog } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import type { ComponentProps, FC } from 'react';
import React, { cloneElement, forwardRef, isValidElement } from 'react';
import { capitalize } from '@mui/material/utils';
import type { PaperProps } from '@mui/material/Paper';
import type { BackdropProps } from '@mui/material/Backdrop';
import useScreenSize from '../../../hooks/useScreenSize';
import IconButton from '../../../components/Buttons/IconButton';
import Divider from '../../../components/Divider';
import { Times } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import Surface from '../../../components/Surfaces/Surface';
import Typography from '../../../components/Typography';
import useStyles from './Modal.styles';
import { ARIA_CLOSE_DIALOG } from './Modal.constants';
import Scrim from '../../../components/Scrim';
import type { DataAttributes } from '../../../types/common';
import { useComponentCountController } from '../../../hooks/useComponentCounterHooks/useComponentCounterHooks';

const Transition = forwardRef(
  (props: ComponentProps<typeof Slide> & { children?: React.ReactElement }, ref: React.Ref<unknown>) => {
    const style = { width: '100%' };
    return <Slide direction="up" ref={ref} {...props} style={style} />;
  }
);

const PaperComponent: FC<PaperProps> = ({ elevation, ...paperProps }) => (
  <Surface {...paperProps} color="100">
    {paperProps.children}
  </Surface>
);

const BackdropComponent: FC<BackdropProps> = ({ children, className, open, ...scrimProps }) => {
  const { classes, cx } = useStyles();

  return (
    <Scrim
      {...scrimProps}
      className={cx(className, classes.backdrop)}
      isOpen={open}
      variant="dark"
      innerChildren={children}
    />
  );
};

export interface ModalProps {
  size?: 'sm' | 'md' | 'lg';
  id: string;
  open: boolean;
  title: string | React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  rootClassName?: string;
  titleClassName?: string;
  containerClassName?: string;
  paperClassName?: string;
  TransitionProps?: {
    onEntered: () => void;
    onExiting: () => void;
  };
  closeButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const Modal: FC<ModalProps> = ({
  size = 'md',
  id,
  open,
  title,
  onClose,
  children,
  rootClassName,
  titleClassName,
  containerClassName,
  paperClassName,
  TransitionProps,
  closeButtonProps,
  ...props
}) => {
  useComponentCountController('Modal', !!open);
  const { classes, cx } = useStyles();
  const { isTablet, isTabletUp } = useScreenSize('Tablet');

  const content = isValidElement(children)
    ? cloneElement(children, {
        className: cx(classes.contentWrapper, children.props.className),
      })
    : children;
  const actualSize = isTablet && size === 'md' ? 'lg' : size;
  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(actualSize)}`];

  return (
    <MuiDialog
      open={open}
      fullScreen={!isTabletUp}
      onClose={onClose}
      aria-labelledby={id}
      TransitionComponent={Transition}
      BackdropComponent={BackdropComponent}
      classes={{
        root: cx(classes.root, rootClassName),
        paper: cx(classes.paper, { [sizeClassName]: isTabletUp }, paperClassName),
        container: cx(containerClassName),
      }}
      PaperComponent={PaperComponent}
      TransitionProps={TransitionProps}
      {...props}
    >
      <DialogTitle id={id} className={cx(classes.title, titleClassName)}>
        {typeof title === 'string' ? (
          <Typography variant="h4" className={classes.titleText} component="span">
            {title}
          </Typography>
        ) : (
          title
        )}
        {onClose && (
          <IconButton
            {...closeButtonProps}
            size="md"
            onClick={onClose}
            icon={<Icon icon={Times} />}
            aria-label={ARIA_CLOSE_DIALOG}
          />
        )}
      </DialogTitle>
      <Divider direction="horizontal" />
      {content}
    </MuiDialog>
  );
};

export default Modal;
