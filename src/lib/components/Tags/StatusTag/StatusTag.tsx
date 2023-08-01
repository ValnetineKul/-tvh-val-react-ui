import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import LimitedText from '../../LimitedText';
import useStyles from './StatusTag.styles';
import Surface from '../../Surfaces/Surface';
import { DEFAULT_MAX_CHARACTERS_LENGTH } from '../../LimitedText/LimitedText.constants';

export interface StatusTagProps {
  status?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
  label: string;
  subLabel?: string;
  maxCharactersLength?: number;
}

const fontVariant = {
  sm: 'body400',
  md: 'body500',
} as const;

const StatusTag: FC<StatusTagProps> = ({
  status = 'success',
  size = 'md',
  label,
  subLabel,
  className,
  maxCharactersLength = DEFAULT_MAX_CHARACTERS_LENGTH,
}) => {
  const { classes, cx } = useStyles();
  const variant = fontVariant[size];

  return (
    <Surface color={capitalize(status)} className={cx(classes.root, className)}>
      <LimitedText
        text={label}
        typographyProps={{ variant, weight: 'emphasis', component: 'span' }}
        maxCharactersLength={maxCharactersLength}
      />
      {subLabel && <LimitedText text={subLabel} typographyProps={{ variant: 'body400', component: 'span' }} />}
    </Surface>
  );
};

export default StatusTag;
