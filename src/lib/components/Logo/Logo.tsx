import React from 'react';
import type { FC, MouseEventHandler } from 'react';
import { capitalize } from '@mui/material/utils';
import { useTheme, useSurface } from '../../../themes/core';
import ButtonBase from '../Surfaces/ButtonBase';
import type { ButtonBaseProps } from '../ButtonBase';
import { useButtonBase } from '../ButtonBase';
import Image from '../MediaItems/Image';
import useStyles from './Logo.styles';

export interface LogoProps extends ButtonBaseProps {
  alt?: string;
  subAlt?: string;
  size?: 'sm' | 'md';
  variant?: 'positive' | 'negative';
  bepcoVariant?: 'company' | 'productBrand';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Logo: FC<LogoProps> = ({
  alt = 'Logo',
  subAlt = 'A company of TVH.',
  size = 'sm',
  variant = 'positive',
  bepcoVariant = 'company',
  onClick,
  className,
  ...props
}) => {
  const { color } = useSurface();
  const { classes, cx } = useStyles();

  const buttonBaseProps = useButtonBase(props);

  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];
  const sizeCompanyClassName = (classes as Record<string, string>)[`sizeCompany${capitalize(size)}`];
  const sizeSubLogoClassName = (classes as Record<string, string>)[`sizeSubLogo${capitalize(size)}`];

  const theme = useTheme();

  const withCompanySubLogo = bepcoVariant === 'productBrand' && theme.logo.subLogo;

  const renderLogo = () => {
    if (withCompanySubLogo) {
      return (
        <span className={classes.withSubLogo}>
          <Image src={theme.logo[variant]} alt={alt} fallback="text" className={sizeCompanyClassName} />
          <Image src={theme.logo.subLogo} alt={subAlt} fallback="text" className={sizeSubLogoClassName} />
        </span>
      );
    }
    return <Image src={theme.logo[variant]} alt={alt} fallback="text" className={sizeClassName} />;
  };

  return (
    <ButtonBase color={color} className={cx(classes.root, className)} onClick={onClick} {...buttonBaseProps}>
      {renderLogo()}
    </ButtonBase>
  );
};

export default Logo;
