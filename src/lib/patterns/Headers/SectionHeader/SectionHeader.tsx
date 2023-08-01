import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';
import Typography from '../../../components/Typography';
import useStyles from './SectionHeader.styles';
import { HasSingleIconButtonContext } from './HasSingleIconButtonContext/HasSingleIconButtonContext';

export interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  headerType?: 'functional' | 'commercial';
  headerActions?: ReactNode;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  headerType = 'functional',
  headerActions,
  subtitle,
  className,
}) => {
  const { classes, cx } = useStyles();
  const [hasSingleIconButton, setHasSingleIconButton] = useState(false);

  function getSubtitleElement(): ReactNode {
    if (!subtitle) return null;

    return typeof subtitle === 'string' ? (
      <Typography variant="body500" className={classes.subtitle}>
        {subtitle}
      </Typography>
    ) : (
      subtitle
    );
  }

  return (
    <HasSingleIconButtonContext.Provider value={{ hasSingleIconButton, setHasSingleIconButton }}>
      <div className={cx(classes.root, { [classes.multilineRoot]: !hasSingleIconButton }, className)}>
        <div>
          <Typography variant="h2" headerType={headerType} className={classes.title}>
            {title}
          </Typography>

          {getSubtitleElement()}
        </div>
        {headerActions && (
          <div className={cx(classes.actionsWrapper, { [classes.multilineActionWrappper]: !hasSingleIconButton })}>
            {headerActions}
          </div>
        )}
      </div>
    </HasSingleIconButtonContext.Provider>
  );
};
export default SectionHeader;
