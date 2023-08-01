import type { Surface as SurfaceType } from '../../../../themes/core';
import type { ButtonBaseProps } from '../../ButtonBase';
import type { DataAttributes } from '../../../types/common';

type Never<T> = { [P in keyof T]?: never };

type CommonProps = ButtonBaseProps & {
  label: string | JSX.Element;
  selected?: boolean;
  disabled?: boolean;
  elementType?: React.ElementType;
  labelClassName?: string;
  className?: string;
  focusVisibleClassName?: string;
  buttonBaseClassName?: string;
  color?: SurfaceType;
  style?: React.CSSProperties;
  subMenu?: React.ReactElement<MenuItemProps>[];
};

type ButtonProps = {
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
  onClick?: React.MouseEventHandler;
};

type EndIcon = {
  endIcon: React.ReactNode;
};

type StartIcon = {
  startIcon: React.ReactNode;
};

type StartAndEnd = StartIcon & EndIcon;

type Tag = {
  tag: React.ReactNode;
};

type InlineMessage = {
  inlineMessage: React.ReactNode;
};

type SubLabel = {
  subLabel: JSX.Element | React.ReactNode;
};

type SubLabelAndTag = SubLabel & Tag;

type StartAndSubLabel = StartIcon & SubLabel;

type StartAndSubLabelAndTag = StartAndSubLabel & Tag;

type CheckboxProps = {
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  checkboxProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
  checkbox: boolean;
  indeterminate?: boolean;
};

type CheckboxAndTag = CheckboxProps & Tag;

type ConfigurableParams = EndIcon & StartIcon & Tag & InlineMessage & SubLabel & CheckboxProps;

type IgnoreConfigurableParams<K extends keyof ConfigurableParams> = Never<Omit<ConfigurableParams, K>>;

type NothingElse = Never<ConfigurableParams> & Never<ButtonProps>;

type OnlyEndIcon = EndIcon & IgnoreConfigurableParams<keyof EndIcon>;

type OnlyTag = Tag & IgnoreConfigurableParams<keyof Tag>;

type OnlyInlineMessage = InlineMessage & IgnoreConfigurableParams<keyof InlineMessage>;

type OnlySubLabel = SubLabel & IgnoreConfigurableParams<keyof SubLabel>;

type OnlyStartIcon = StartIcon & IgnoreConfigurableParams<keyof StartIcon>;

type OnlyStartAndEnd = StartAndEnd & IgnoreConfigurableParams<keyof StartAndEnd>;

type OnlySubLabelAndTag = SubLabelAndTag & IgnoreConfigurableParams<keyof SubLabelAndTag>;

type OnlyStartAndSubLabel = StartAndSubLabel & IgnoreConfigurableParams<keyof StartAndSubLabel>;

type OnlyStartAndSubLabelAndTag = StartAndSubLabelAndTag & IgnoreConfigurableParams<keyof StartAndSubLabelAndTag>;

type OnlyCheckbox = CheckboxProps & IgnoreConfigurableParams<keyof CheckboxProps> & Never<ButtonProps>;

type OnlyCheckboxAndTag = CheckboxAndTag & IgnoreConfigurableParams<keyof CheckboxProps | 'tag'> & Never<ButtonProps>;

type OnlyButtonParams = ButtonProps & Never<ConfigurableParams>;

export type MenuItemProps = CommonProps &
  (
    | NothingElse
    | OnlyButtonParams
    | (ButtonProps &
        (
          | OnlyEndIcon
          | OnlyTag
          | OnlyInlineMessage
          | OnlySubLabel
          | OnlyStartIcon
          | OnlySubLabelAndTag
          | OnlyStartAndEnd
          | OnlyStartAndSubLabel
          | OnlyStartAndSubLabelAndTag
        ))
    | OnlyCheckbox
    | OnlyCheckboxAndTag
  );
