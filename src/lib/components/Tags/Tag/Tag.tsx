import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import LimitedText from '../../LimitedText';
import useStyles from './Tag.styles';
import { DEFAULT_MAX_CHARACTERS_LENGTH } from '../../LimitedText/LimitedText.constants';

const DEFAULT_ICON_SIZE = 'sm';

export interface TagProps {
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
  startIcon?: React.ReactElement;
  label: string;
  maxCharactersLength?: number;
}

const fontVariant = {
  sm: 'body400',
  md: 'body500',
} as const;

const Tag: FC<TagProps> = ({
  label,
  color = 'primary',
  size = 'md',
  className,
  startIcon,
  maxCharactersLength = DEFAULT_MAX_CHARACTERS_LENGTH,
}) => {
  const { classes, cx } = useStyles();

  const colorClassName = (classes as Record<string, string>)[`color${capitalize(color)}`];
  const variant = fontVariant[size];

  return (
    <div className={cx(classes.root, colorClassName, className)}>
      {startIcon && React.cloneElement(startIcon, { size: DEFAULT_ICON_SIZE, className: classes.icon })}
      <LimitedText
        text={label}
        typographyProps={{ variant, component: 'span' }}
        maxCharactersLength={maxCharactersLength}
      />
    </div>
  );
};
export default Tag;
