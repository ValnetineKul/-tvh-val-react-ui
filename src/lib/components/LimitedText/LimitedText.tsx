import type { FC } from 'react';
import React from 'react';
import useScreenSize from '../../hooks/useScreenSize';
import truncate from '../../helpers/truncate';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';
import type { TypographyProps } from '../Typography/Typography';
import type { TooltipProps } from '../Tooltip/Tooltip';
import { DEFAULT_MAX_CHARACTERS_LENGTH } from './LimitedText.constants';

export interface LimitedTextProps {
  text: string;
  maxCharactersLength?: number;
  typographyProps?: TypographyProps;
  tooltipProps?: Pick<TooltipProps, 'position' | 'enterTouchDelay' | 'className'>;
}

const LimitedText: FC<LimitedTextProps> = ({
  text,
  maxCharactersLength = DEFAULT_MAX_CHARACTERS_LENGTH,
  typographyProps,
  tooltipProps,
}) => {
  const { isTabletUp } = useScreenSize('Tablet');
  const shouldShowTooltip = text.length >= maxCharactersLength;

  if (isTabletUp) {
    return (
      <Tooltip {...tooltipProps} label={shouldShowTooltip ? text : ''} disableHoverListener={!shouldShowTooltip}>
        <Typography {...typographyProps}>{truncate(text, maxCharactersLength)}</Typography>
      </Tooltip>
    );
  }

  return <Typography {...typographyProps}>{text}</Typography>;
};

export default LimitedText;
