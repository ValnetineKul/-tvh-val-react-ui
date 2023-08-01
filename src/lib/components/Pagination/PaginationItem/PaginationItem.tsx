import type { FC } from 'react';
import React from 'react';
import Button from '../../Buttons/Button';
import IconButton from '../../Buttons/IconButton';
import { AngleLeft, AngleRight } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './PaginationItem.styles';

type PaginationItemType = 'page' | 'start-ellipsis' | 'end-ellipsis' | 'next' | 'previous';

export interface PaginationItemProps extends React.AriaAttributes {
  type: PaginationItemType;
  page: number;
  selected: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PaginationItem: FC<PaginationItemProps> = ({
  type = 'page',
  page,
  selected = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const { classes, cx } = useStyles();

  const icons: Record<
    PaginationItemType,
    React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    > | null
  > = {
    previous: AngleLeft,
    next: AngleRight,
    page: null,
    'start-ellipsis': null,
    'end-ellipsis': null,
  };

  const ArrowIcon = icons[type];

  return (
    <div>
      {type === 'start-ellipsis' || type === 'end-ellipsis' ? (
        <span className={cx(classes.ellipsis, { [classes.disabled]: disabled })}>…</span>
      ) : (
        <>
          {type === 'page' && (
            <Button
              variant={selected ? 'primary' : 'link'}
              label={`${page}`}
              disabled={disabled}
              className={cx(classes.page, { [classes.linkButton]: !selected })}
              onClick={onClick}
              {...props}
            />
          )}
          {ArrowIcon && (
            <IconButton
              icon={<Icon icon={ArrowIcon} />}
              className={classes.arrowButton}
              size="md"
              disabled={disabled}
              onClick={onClick}
              {...props}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaginationItem;
