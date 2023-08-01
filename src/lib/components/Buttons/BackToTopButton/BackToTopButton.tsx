import type { FC } from 'react';
import React from 'react';
import FloatingActionButton from '../FloatingActionButton';
import { AngleUp } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './BackToTopButton.styles';
import useBackToTop from './useBackToTop';

export interface BackToTopButtonProps extends React.AriaAttributes {
  disabled?: boolean;
  className?: string;
}

const BackToTopButton: FC<BackToTopButtonProps> = ({ disabled = false, className, ...props }) => {
  const { classes, cx } = useStyles();

  const shouldShowBackToTop = useBackToTop();
  if (!shouldShowBackToTop) {
    return null;
  }

  return (
    <FloatingActionButton
      disabled={disabled}
      className={cx(classes.root, classes.backToTop, className)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      icon={<Icon icon={AngleUp} />}
      variant="secondary"
      {...props}
    />
  );
};

export default BackToTopButton;
