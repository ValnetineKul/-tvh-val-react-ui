import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { capitalize } from '@mui/material/utils';
import useStyles from './Icon.styles';

export interface IconProps extends React.AriaAttributes {
  icon: React.FunctionComponent;
  size?: 'md' | 'sm' | 'xl';
  className?: string;
  title?: string;
  isMultiColor?: boolean;
}

const Icon = ({ icon, size = 'md', className, title, isMultiColor = false, ...props }: IconProps) => {
  const { classes, cx } = useStyles();
  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];

  const IconComponent = typeof icon === 'string' ? React.lazy(() => import(`./icons/${icon}`)) : icon;

  return (
    <div className={cx(classes.root, sizeClassName, className)}>
      <SvgIcon
        htmlColor={isMultiColor ? 'transparent' : 'inherit'}
        component={IconComponent as React.ElementType}
        // a11y mui issue: combination "component + titleAccess" does not work: https://github.com/mui/material-ui/issues/33421
        titleAccess={title}
        {...props}
      />
    </div>
  );
};

export default Icon;
