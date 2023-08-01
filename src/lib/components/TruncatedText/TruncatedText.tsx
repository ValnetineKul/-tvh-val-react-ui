import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';
import type { TypographyProps } from '../Typography/Typography';
import type { TooltipProps } from '../Tooltip/Tooltip';
import useStyles from './TruncatedText.styles';

export interface TruncatedTextProps {
  text: string;
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
  tooltipProps?: Pick<TooltipProps, 'position' | 'enterTouchDelay' | 'className'>;
}

const TruncatedText: FC<TruncatedTextProps> = ({ text, children, typographyProps, tooltipProps }) => {
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const { classes, cx } = useStyles();
  const customRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const compareSize = () => {
      const canHaveToolTip =
        text && customRef && customRef.current && customRef.current.scrollWidth > customRef.current.clientWidth;
      setShouldShowTooltip(!!canHaveToolTip);
    };

    compareSize();

    window.addEventListener('resize', compareSize);
    return () => {
      window.removeEventListener('resize', compareSize);
    };
  }, [customRef, text]);
  return (
    <Tooltip
      {...tooltipProps}
      disableHoverListener={!shouldShowTooltip}
      label={shouldShowTooltip ? text : ''}
      className={cx(classes.truncatedText, tooltipProps?.className)}
    >
      <Typography
        {...typographyProps}
        ref={customRef}
        className={cx(classes.truncatedText, typographyProps?.className)}
      >
        {children || text}
      </Typography>
    </Tooltip>
  );
};

export default TruncatedText;
