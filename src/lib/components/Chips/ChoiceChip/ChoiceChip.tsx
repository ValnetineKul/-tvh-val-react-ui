import type { FC } from 'react';
import React from 'react';

import ButtonBase from '../../Surfaces/ButtonBase';
import useStyles from './ChoiceChip.styles';
import Typography from '../../Typography';
import Image from '../../MediaItems/Image';
import type { ButtonBaseProps } from '../../ButtonBase';
import { useButtonBase } from '../../ButtonBase';
import type { DataAttributes } from '../../../types/common';

export interface ChoiceChipProps extends ButtonBaseProps {
  title?: string | React.ReactElement;
  label?: string | React.ReactElement;
  image?: string | React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  fullWidth?: boolean;
  imagePadding?: boolean;
  className?: string;
  buttonProps?: DataAttributes;
}

const ChoiceChip: FC<ChoiceChipProps> = ({
  title,
  label,
  image,
  onClick,
  selected = false,
  fullWidth = false,
  imagePadding = true,
  className,
  buttonProps,
  ...props
}) => {
  const { classes, cx } = useStyles();

  const hasTitleAndLabel = !!title && !!label;
  const hasTwoColumns = (!!title || !!label) && !!image;

  const buttonBaseProps = useButtonBase(props);

  return (
    <ButtonBase
      color="100"
      border
      onClick={onClick}
      className={cx(
        classes.root,
        className,
        { [classes.fullWidth]: fullWidth },
        { [classes.selected]: selected },
        { [classes.hasTwoColumns]: hasTwoColumns },
        { [classes.hasTitleAndLabel]: hasTitleAndLabel }
      )}
      {...(buttonProps || {})}
      {...buttonBaseProps}
    >
      {image && (
        <span className={cx(classes.imageWrapper, { [classes.imagePadding]: imagePadding })}>
          {image && typeof image === 'string' ? (
            <Image src={image} fallbackClassName={classes.fallbackImage} alt="" />
          ) : (
            image
          )}
        </span>
      )}
      {(!!title || !!label) && (
        <span className={cx(classes.label, { [classes.labelWrapper]: !!title })}>
          {title && typeof title === 'string' ? (
            <Typography component="span" weight="emphasis">
              {title}
            </Typography>
          ) : (
            title
          )}
          {label && typeof label === 'string' ? <Typography component="span">{label}</Typography> : label}
        </span>
      )}
    </ButtonBase>
  );
};

export default ChoiceChip;
