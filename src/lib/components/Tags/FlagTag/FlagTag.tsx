import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import Icon from '../../Icon';
import Typography from '../../Typography';
import useStyles from './FlagTag.styles';

export interface FlagTagProps {
  icon:
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string;
        }
      >
    | string;
  size?: 'xs' | 'sm' | 'md';
  classNames?: { root?: string; patch?: string; extraPatch?: string };
  message: string;
  hasLabel?: boolean;
}

const FlagTag: FC<FlagTagProps> = ({ message, size = 'md', classNames, hasLabel = true, icon }) => {
  const { classes, cx } = useStyles();

  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];
  const rootClassName = cx(classes.root, sizeClassName, classNames && classNames.root, {
    [classes.noLabel]: !hasLabel,
  });
  const patchLabelClassName = cx(
    classes.patchLabel,
    classes.extraPatchLabel,
    classNames && classNames.patch,
    classNames && classNames.extraPatch,
    { [classes.textIconWrapper]: typeof icon === 'string' }
  );

  const printLabel = () => {
    return hasLabel ? (
      <Typography
        variant="inherit"
        className={cx(classes.patchLabel, classes.labelText, classNames && classNames.patch)}
      >
        {message}
      </Typography>
    ) : null;
  };

  const printIcon = () => {
    return typeof icon === 'string' ? (
      <span className={cx(classes.icon, classes.textIcon)}>{icon}</span>
    ) : (
      <Icon icon={icon} size={size === 'xs' ? 'sm' : 'md'} aria-label={message} className={classes.icon} />
    );
  };

  return (
    <div className={rootClassName}>
      <div className={classes.tagBox}>
        {printLabel()}
        <div className={patchLabelClassName}>{printIcon()}</div>
      </div>
    </div>
  );
};

export default FlagTag;
