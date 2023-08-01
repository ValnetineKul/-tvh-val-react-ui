import React from 'react';
import type { FC } from 'react';
import classNames from 'classnames';

import Typography from '../../Typography';
import useStyles from './CardHeader.styles';

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, className }) => {
  const { classes } = useStyles();
  return (
    <div className={classNames(classes.root, className)}>
      <Typography variant="h3">{title}</Typography>
      <Typography component="span" variant="h4" secondary>
        {subtitle}
      </Typography>
    </div>
  );
};

export default CardHeader;
