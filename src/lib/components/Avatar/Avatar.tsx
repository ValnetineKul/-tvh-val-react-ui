import React, { useState } from 'react';
import type { FC } from 'react';
import { capitalize } from '@mui/material/utils';
import useStyles from './Avatar.styles';
import { User } from '../Icon/icons/functional';
import Typography from '../Typography';
import Icon from '../Icon';
import Surface from '../Surfaces/Surface';

const typographyVariantMapping = {
  xs: 'body300',
  sm: 'body500',
  md: 'h3',
  lg: 'h1',
};

const iconSizeMapping = {
  xs: 'sm',
  sm: 'md',
  md: 'md',
  lg: 'xl',
};

export interface AvatarProps {
  className?: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  imageAlt?: string;
  imageSrc?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  text?: string;
}

const Avatar: FC<AvatarProps> = ({ className, icon = User, imageAlt, imageSrc, size = 'sm', text }) => {
  const { classes, cx } = useStyles();
  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];

  const [isFallbackVisible, setIsFallbackVisible] = useState(false);

  const handleError = () => {
    setIsFallbackVisible(true);
  };

  const renderIcon = () => {
    return <Icon size={iconSizeMapping[size] as 'sm' | 'md' | 'xl'} icon={icon} />;
  };

  const renderText = () => {
    const variant = typographyVariantMapping[size];
    const isBody = variant.indexOf('body') >= 0;

    if (isBody) {
      return (
        <Typography component="span" variant={variant as 'body300' | 'body500'} weight="emphasis">
          {text}
        </Typography>
      );
    }

    return (
      <Typography component="span" variant={variant as 'h1' | 'h3'}>
        {text}
      </Typography>
    );
  };

  const renderFallBack = () => {
    if (text) return renderText();
    return renderIcon();
  };

  const renderImage = () => {
    return isFallbackVisible ? (
      renderFallBack()
    ) : (
      <img src={imageSrc} alt={imageAlt} onError={handleError} className={classes.image} />
    );
  };

  const renderChildren = () => {
    if (imageSrc) return renderImage();
    return renderFallBack();
  };

  const getColor = () => {
    if (imageSrc && !isFallbackVisible) return '150';
    return '200';
  };

  return (
    <Surface color={getColor()} className={cx(classes.root, sizeClassName, className)}>
      {renderChildren()}
    </Surface>
  );
};

export default Avatar;
