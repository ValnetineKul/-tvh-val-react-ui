import type { FC, ImgHTMLAttributes } from 'react';
import React, { useEffect, useState } from 'react';
import Typography from '../../Typography';
import { FallbackImage } from '../../Illustrations/illustrations';
import useStyles from './Image.styles';

export interface ImageProps extends ImgHTMLAttributes<HTMLElement> {
  src: string | undefined | null;
  alt: string;
  fallback?: 'image' | 'text';
  fallbackClassName?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className, fallback = 'image', fallbackClassName, ...props }) => {
  const { classes, cx } = useStyles();

  // if the src is null or undefined, the onError event is not triggered
  const isImageError = src === undefined || src === null;

  const [isFallbackVisible, setIsFallbackVisible] = useState(isImageError);
  const handleError = () => {
    setIsFallbackVisible(true);
  };

  useEffect(() => {
    return () => {
      setIsFallbackVisible(false);
    };
  }, [src]);

  const fallbackVariant =
    fallback === 'image' ? (
      <img src={FallbackImage} alt="" className={cx(classes.root, classes.fallback, className, fallbackClassName)} />
    ) : (
      <Typography weight="emphasis" component="span">
        {alt}
      </Typography>
    );

  return isFallbackVisible ? (
    fallbackVariant
  ) : (
    <img {...props} src={src} alt={alt} onError={handleError} className={cx(classes.root, className)} />
  );
};

export default Image;
