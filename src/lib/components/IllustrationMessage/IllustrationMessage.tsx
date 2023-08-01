import React from 'react';
import type { FC } from 'react';
import Typography from '../Typography';
import Button from '../Buttons/Button';
import useStyles from './IllustrationMessage.styles';
import useScreenSize from '../../hooks/useScreenSize';
import type { DataAttributes } from '../../types/common';

export interface IllustrationMessageProps {
  header: string;
  description: string;
  SvgImage: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  direction?: 'vertical' | 'horizontal';
  actionLabel?: string;
  onAction?: () => void;
  alternativeActionLabel?: string;
  onAlternativeAction?: () => void;
  isAlternativeActionLoading?: boolean;
  isLoading?: boolean;
  actionButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const IllustrationMessage: FC<IllustrationMessageProps> = ({
  header,
  description,
  SvgImage,
  direction = 'horizontal',
  actionLabel,
  onAction,
  alternativeActionLabel,
  onAlternativeAction,
  isAlternativeActionLoading,
  isLoading,
  actionButtonProps,
}) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  const renderActions = () => {
    const actions: React.ReactNode[] = [];

    if (onAction && actionLabel) {
      actions.push(
        <Button
          key="action"
          className={cx({ [classes.buttonXs]: !isTabletUp })}
          containerClassName={cx({ [classes.buttonXs]: !isTabletUp })}
          onClick={onAction}
          variant="primary"
          label={actionLabel}
          isLoading={isLoading}
          {...actionButtonProps}
        />
      );
    }

    if (onAlternativeAction && alternativeActionLabel) {
      actions.push(
        <Button
          key="alternative"
          className={cx({ [classes.buttonXs]: !isTabletUp })}
          containerClassName={cx({ [classes.buttonXs]: !isTabletUp })}
          onClick={onAlternativeAction}
          variant="tertiary"
          label={alternativeActionLabel}
          isLoading={isAlternativeActionLoading}
        />
      );
    }

    if (!actions.length) {
      return null;
    }

    return (
      <div
        className={cx(classes.action, {
          [classes.actionVertical]: direction === 'vertical' || !isTabletUp,
          [classes.actionXs]: !isTabletUp,
        })}
      >
        {actions}
      </div>
    );
  };

  const isVerticalDirection = direction === 'vertical' || !isTabletUp;

  return (
    <div className={cx(classes.root, { [classes.rootVertical]: isVerticalDirection })}>
      <div className={cx(classes.imageWrapper, { [classes.imageWrapperVertical]: isVerticalDirection })}>
        <SvgImage />
      </div>
      <div className={cx(classes.contentWrapper, { [classes.contentWrapperVertical]: isVerticalDirection })}>
        <Typography className={classes.header} variant="h4">
          {header}
        </Typography>
        <Typography>{description}</Typography>
        {renderActions()}
      </div>
    </div>
  );
};

export default IllustrationMessage;
