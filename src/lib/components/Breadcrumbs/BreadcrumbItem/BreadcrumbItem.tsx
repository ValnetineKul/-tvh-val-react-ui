import React from 'react';
import type { FC, ReactElement, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import ButtonBase from '../../Surfaces/ButtonBase';
import Typography from '../../Typography';
import type { DataAttributes } from '../../../types/common';
import useStyles from './BreadcrumbItem.styles';

interface CommonProps {
  label: string;
  icon?: ReactElement;
  className?: string;
}

interface LinkProps {
  url: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
}

interface CurrentPageProps {
  currentPage?: boolean;
  url?: never;
  onClick?: never;
  buttonProps?: never;
}

export type BreadcrumbItemProps = CommonProps & (LinkProps | CurrentPageProps);

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ label, icon, className, ...props }) => {
  const { classes } = useStyles();

  const url = 'url' in props && props.url;
  const isCurrentPage = 'currentPage' in props && props.currentPage;
  const onClick = 'onClick' in props ? props.onClick : undefined;
  const buttonProps = 'buttonProps' in props ? props.buttonProps : undefined;

  const renderIcon = () => icon && React.cloneElement(icon, { size: 'sm' });

  if (icon && url) {
    return (
      <ButtonBase
        color="100"
        component={Link}
        to={url}
        onClick={onClick}
        aria-label={label}
        className={classes.buttonBase}
        buttonProps={buttonProps}
      >
        {renderIcon()}
      </ButtonBase>
    );
  }

  if (isCurrentPage) {
    if (icon) {
      return (
        <>
          <span className={classes.visuallyHidden}>{label}</span>
          {renderIcon()}
        </>
      );
    }

    return (
      <Typography variant="body400" component="span" className={classes.currentPage}>
        {label}
      </Typography>
    );
  }

  if (url && !icon) {
    return (
      <ButtonBase
        color="100"
        component={Link}
        to={url}
        onClick={onClick}
        className={classes.buttonBase}
        buttonProps={buttonProps}
      >
        <Typography variant="body400" component="span" className={classes.hierarchicalPage}>
          {label}
        </Typography>
      </ButtonBase>
    );
  }

  return null;
};

export default BreadcrumbItem;
