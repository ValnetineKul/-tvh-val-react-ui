import React from 'react';
import type { HTMLAttributes } from 'react';
import { capitalize } from '@mui/material/utils';
import useStyles from './Typography.styles';

interface Body {
  variant?: 'body600' | 'body500' | 'body400' | 'body300';
  weight?: 'regular' | 'emphasis';
  headerType?: never;
}

interface Heading {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  headerType?: 'functional' | 'commercial';
  weight?: never;
}

interface Inherit {
  variant: 'inherit';
  headerType?: never;
  weight?: never;
}

interface DefaultVariantMapping {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
  body600: string;
  body500: string;
  body400: string;
  body300: string;
  inherit: null;
}

export type TypographyProps = {
  variantMapping?: DefaultVariantMapping;
  component?: React.ElementType;
  secondary?: boolean;
} & (Inherit | Heading | Body) &
  HTMLAttributes<HTMLElement>;

const defaultVariantMapping: DefaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body600: 'p',
  body500: 'p',
  body400: 'p',
  body300: 'p',
  inherit: null,
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const {
    weight = 'regular',
    headerType = 'functional',
    variant = 'body500',
    secondary: isSecondary = false,
    variantMapping = defaultVariantMapping,
    component,
    className,
    ...rest
  } = props;

  const { classes, cx } = useStyles();
  const weightClassName =
    ['body600', 'body500', 'body400', 'body300'].includes(variant) &&
    (classes as Record<string, string>)[`weight${capitalize(weight || 'regular')}`];

  const headerTypClassName =
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) &&
    (classes as Record<string, string>)[`header${capitalize(headerType || 'functional')}`];

  const Component = component || variantMapping[variant] || defaultVariantMapping[variant] || 'span';

  return (
    <Component
      className={cx(classes.root, weightClassName, headerTypClassName, className, {
        [classes[variant]]: variant !== 'inherit',
        [classes.secondary]: isSecondary,
      })}
      ref={ref}
      {...rest}
    />
  );
});
Typography.displayName = 'Typography';

export default Typography;
