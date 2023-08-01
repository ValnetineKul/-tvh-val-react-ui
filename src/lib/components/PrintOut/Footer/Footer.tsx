import React from 'react';
import type { FC } from 'react';
import { useTheme } from '../../../../themes/core';
import Typography from '../../Typography';
import Image from '../../MediaItems/Image';
import useStyles from './Footer.styles';

export interface FooterProps {
  text?: string;
  alt?: string;
  className?: string;
  logoClassName?: string;
}

const Footer: FC<FooterProps> = ({ text = 'www.tvh.com', alt = 'Logo', className, logoClassName }) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();

  return (
    <footer className={cx(classes.root, className)}>
      <Typography className={classes.link} headerType="commercial" variant="h6" component="span">
        {text}
      </Typography>
      <Image src={theme.logo['positive']} alt={alt} fallback="text" className={cx(classes.logo, logoClassName)} />
    </footer>
  );
};

export default Footer;
