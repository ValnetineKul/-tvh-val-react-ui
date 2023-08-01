import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { AngleLeft, Times } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import IconButton from '../../../components/Buttons/IconButton';
import Logo from '../../../components/Logo';
import Surface from '../../../components/Surfaces/Surface';
import Tooltip from '../../../components/Tooltip';
import Typography from '../../../components/Typography';
import type { ButtonBaseProps } from '../../../components/ButtonBase';
import type { DataAttributes } from '../../../types/common';
import { useButtonBase } from '../../../components/ButtonBase';
import useStyles from './DrawerHeader.styles';

interface CommonProps extends ButtonBaseProps {
  onClose: () => void;
  className?: string;
  closeButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

interface LogoProps {
  isLogo: boolean;
  heading?: never;
  onStartButtonClick?: never;
}

interface HeadingProps {
  heading: string;
  onStartButtonClick?: () => void;
  isLogo?: never;
}

export type DrawerHeaderProps = CommonProps & (LogoProps | HeadingProps);

const DrawerHeader: FC<DrawerHeaderProps> = ({ children, onClose, className, closeButtonProps, ...props }) => {
  const { classes, cx } = useStyles();

  const isLogo = 'isLogo' in props && props.isLogo;
  const heading = 'heading' in props && props.heading;
  const onStartButtonClick = 'onStartButtonClick' in props ? props.onStartButtonClick : undefined;

  const isShowLogo = isLogo || !heading;
  const buttonBaseProps = useButtonBase(props);

  const headingRef = useRef<HTMLElement>(null);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);

  useEffect(() => {
    const compareSize = () => {
      setShouldShowTooltip(
        !!(
          heading &&
          headingRef &&
          headingRef.current &&
          headingRef.current.scrollWidth > headingRef.current.clientWidth
        )
      );
    };

    compareSize();

    window.addEventListener('resize', compareSize);
    return () => {
      window.removeEventListener('resize', compareSize);
    };
  }, [heading]);

  return (
    <Surface color="Primary">
      <div className={cx(classes.header, className)}>
        {isShowLogo && <Logo variant="negative" size="sm" {...buttonBaseProps} />}
        {heading && (
          <div className={classes.headingWrapper}>
            {onStartButtonClick && (
              <IconButton aria-label="back" size="md" onClick={onStartButtonClick} icon={<Icon icon={AngleLeft} />} />
            )}
            <Tooltip label={heading} disableHoverListener={!shouldShowTooltip} className={classes.truncatedHeading}>
              <Typography
                variant="h4"
                ref={headingRef}
                className={cx(classes.truncatedHeading, { [classes.heading]: !!onStartButtonClick })}
              >
                {heading}
              </Typography>
            </Tooltip>
          </div>
        )}
        <IconButton {...closeButtonProps} aria-label="close" size="md" onClick={onClose} icon={<Icon icon={Times} />} />
      </div>
    </Surface>
  );
};

export default DrawerHeader;
