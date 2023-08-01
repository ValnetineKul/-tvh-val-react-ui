import React, { forwardRef, isValidElement } from 'react';
import { default as MuiMenuItem } from '@mui/material/MenuItem';
import TruncatedText from '../../TruncatedText/TruncatedText';
import ButtonBase from '../../Surfaces/ButtonBase';
import Checkbox from '../../Checkbox';
import useStyles from './MenuItem.styles';
import { useButtonBase } from '../../ButtonBase';
import type { MenuItemProps } from './MenuItem.types';

const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    {
      label,
      selected = false,
      disabled = false,
      elementType = 'li',
      labelClassName,
      className,
      focusVisibleClassName,
      buttonBaseClassName,
      color = '100',
      style,
      tag,
      subLabel,
      onClick,
      onCheckboxChange,
      checkboxProps,
      checkbox: hasCheckbox,
      indeterminate: isIndeterminate,
      ...props
    },
    ref
  ) => {
    const { classes, cx } = useStyles({ surface: color });

    const startIcon = 'startIcon' in props && props.startIcon;
    const endIcon = 'endIcon' in props && props.endIcon;
    const inlineMessage = 'inlineMessage' in props && props.inlineMessage;
    const buttonProps = 'buttonProps' in props && props.buttonProps;

    const renderLabel = () => {
      return typeof label === 'string' ? (
        <TruncatedText
          text={label}
          typographyProps={{
            component: 'span',
            weight: selected ? ('emphasis' as const) : ('regular' as const),
            className: labelClassName,
          }}
          tooltipProps={{ className: classes.label }}
        />
      ) : (
        label
      );
    };

    const renderTag = () => {
      return React.isValidElement(tag)
        ? React.cloneElement(tag, { size: 'sm', className: cx(tag.props.className, classes.tag) })
        : undefined;
    };

    const renderCheckboxLabel = () => {
      if (tag) {
        return (
          <span className={classes.checkboxWithTagWrapper}>
            {renderLabel()}
            {renderTag()}
          </span>
        );
      }
      return renderLabel();
    };

    const buttonBaseProps = useButtonBase(props);

    return (
      <MuiMenuItem
        ref={ref}
        classes={{ root: classes.root, selected: classes.selected, focusVisible: classes.focusVisible }}
        className={cx({ [classes.disabled]: disabled }, className)}
        selected={selected}
        disabled={disabled}
        component={elementType}
        style={style}
      >
        {hasCheckbox ? (
          <>
            {onCheckboxChange && (
              <Checkbox
                inputProps={checkboxProps}
                onChange={onCheckboxChange}
                className={classes.label}
                formControlLabelClassName={focusVisibleClassName}
                label={renderCheckboxLabel()}
                indeterminate={isIndeterminate}
                checked={selected}
                disabled={disabled}
              />
            )}
          </>
        ) : (
          <ButtonBase
            {...buttonProps}
            {...buttonBaseProps}
            color={color}
            onClick={onClick}
            className={cx(classes.wrapper, focusVisibleClassName, buttonBaseClassName)}
            focus="inset"
            disabled={disabled}
          >
            {startIcon && isValidElement(startIcon)
              ? React.cloneElement(startIcon, { size: 'md', className: classes.startIcon })
              : startIcon}
            <div className={cx(classes.labelWrapper, classes.label)}>
              {renderLabel()}
              {subLabel &&
                (typeof subLabel === 'string' ? (
                  <TruncatedText
                    text={subLabel}
                    typographyProps={{
                      component: 'div',
                      variant: 'body400',
                      secondary: true,
                      className: classes.subLabel,
                    }}
                  />
                ) : (
                  subLabel
                ))}
            </div>
            {inlineMessage &&
              React.isValidElement(inlineMessage) &&
              React.cloneElement(inlineMessage, {
                size: 'sm',
                className: cx(inlineMessage.props.className, classes.inlineMessage),
              })}
            {endIcon &&
              React.isValidElement(endIcon) &&
              React.cloneElement(endIcon, { size: 'md', className: cx(endIcon.props.className, classes.endIcon) })}
            {tag && renderTag()}
          </ButtonBase>
        )}
      </MuiMenuItem>
    );
  }
);
MenuItem.displayName = 'MenuItem';

export default React.memo(MenuItem);
