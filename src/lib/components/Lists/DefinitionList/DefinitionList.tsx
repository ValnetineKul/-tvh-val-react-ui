import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import Divider from '../../Divider';
import Surface from '../../Surfaces/Surface';
import Typography from '../../Typography';
import useStyles from './DefinitionList.styles';

interface Definition {
  key: string;
  keySubtitle?: string;
  value: React.ReactNode;
  valueSubtitle?: React.ReactNode;
}
export interface DefinitionListProps {
  definitions: Definition[];
  cols: 1 | 2;
  columnDistribution: '10/90' | '20/80' | '30/70' | '40/60' | '50/50';
  header?: string;
  width?: 'halfWidth' | 'fullWidth';
  className?: string;
}

const DefinitionList: FC<DefinitionListProps> = ({
  definitions,
  header,
  width = 'fullWidth',
  cols = 1,
  columnDistribution = '50/50',
  className,
}) => {
  const { classes, cx } = useStyles();
  const listWidthClassName = (classes as Record<string, string>)[`list${capitalize(width)}`];
  const columnWidthClassName = (classes as Record<string, string>)[`width${columnDistribution.replace('/', '_')}`];
  const columnNumberClassName = (classes as Record<string, string>)[`cols${cols}`];

  const itemCount = definitions.length;

  return (
    <div className={cx(classes.root, className)}>
      {header && (
        <Surface color="200" className={classes.header}>
          <Typography component="h4" weight="emphasis">
            {header}
          </Typography>
        </Surface>
      )}
      <dl className={cx(classes.definitionsList, listWidthClassName, columnNumberClassName)}>
        {definitions.map((definition, key) => (
          <div key={key} className={classes.definitionWrapper}>
            <div className={classes.definitionsItem}>
              <dt className={cx(classes.definitionKey, columnWidthClassName)}>
                <Typography weight="emphasis" component="span" className={classes.content}>
                  {definition.key}
                </Typography>
                {definition.keySubtitle && (
                  <Typography secondary component="span" className={classes.content}>
                    {definition.keySubtitle}
                  </Typography>
                )}
              </dt>{' '}
              <dd className={cx(classes.definitionValue, columnWidthClassName)}>
                <Typography component="span" className={classes.content}>
                  {definition.value}
                </Typography>
                {definition.valueSubtitle && (
                  <Typography secondary component="span" className={classes.content}>
                    {definition.valueSubtitle}
                  </Typography>
                )}
              </dd>
            </div>
            {key < itemCount - 1 && <Divider direction="horizontal" />}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default DefinitionList;
