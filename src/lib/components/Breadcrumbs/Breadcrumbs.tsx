import React from 'react';
import type { FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { default as MuiBreadcrumbs } from '@mui/material/Breadcrumbs';
import useScreenSize from '../../hooks/useScreenSize';
import { AngleRight, AngleLeft } from '../Icon/icons/functional';
import Icon from '../Icon';
import Button from '../Buttons/Button';
import useStyles from './Breadcrumbs.styles';

export interface BreadcrumbsProps {
  backUrl?: string;
  previousPageName?: string;
  className?: string;
  onBackClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onPreviousPageClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  backUrl,
  previousPageName,
  className,
  onBackClick,
  onPreviousPageClick,
}) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  return (
    <nav className={cx({ [classes.root]: !!backUrl }, className)}>
      {isTabletUp && backUrl && (
        <Button
          variant="tertiary"
          startIcon={<Icon icon={AngleLeft} />}
          size="sm"
          label="Back"
          component={Link}
          to={backUrl}
          onClick={onBackClick}
          className={classes.back}
          surfaceClassName={classes.surfaceBack}
        />
      )}
      <MuiBreadcrumbs
        separator={<Icon icon={AngleRight} size="sm" className={classes.separator} />}
        classes={{ li: classes.verticalAligment }}
        component="div"
      >
        {isTabletUp
          ? children
          : previousPageName && (
              <Button
                variant="link"
                startIcon={<Icon icon={AngleLeft} />}
                size="sm"
                label={previousPageName}
                component={Link}
                to={backUrl}
                onClick={onPreviousPageClick}
              />
            )}
      </MuiBreadcrumbs>
    </nav>
  );
};
export default Breadcrumbs;
