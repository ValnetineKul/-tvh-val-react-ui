import type { FC } from 'react';
import React from 'react';

import Typography from '../../../components/Typography';
import useStyles from './PageHeader.styles';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  headerType?: 'functional' | 'commercial';
  headerActions?: React.ReactElement;
  tag?: React.ReactElement;
  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  headerType = 'functional',
  headerActions,
  tag,
  className,
}) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div>
        <div className={classes.titleWrapper}>
          <div className={classes.title}>
            <Typography variant="h1" headerType={headerType} className={cx({ [classes.titleWithTag]: !!tag })}>
              {title}
            </Typography>
            {tag && (
              <div className={cx(classes.tagWrapper, { [classes.tagWrapperComercial]: headerType === 'commercial' })}>
                {tag}
              </div>
            )}
          </div>
        </div>
        {subtitle && (
          <Typography variant="body500" className={classes.subtitle}>
            {subtitle}
          </Typography>
        )}
      </div>

      {headerActions && <div className={classes.actionsWrapper}>{headerActions}</div>}
    </div>
  );
};
export default PageHeader;
