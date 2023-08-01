import type { ElementType, MouseEventHandler, ReactElement, ReactNode } from 'react';

import type { ButtonBaseProps } from '../../../components/ButtonBase';
import type { DataAttributes } from '../../../types/common';

type Never<T> = { [P in keyof T]?: never };

type CommonProps = ButtonBaseProps & {
  selected?: boolean;
  className?: string;
  elementType?: ElementType;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  itemProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
};

type Label = {
  label: string | JSX.Element;
};

type StartIcon = {
  startIcon: ReactElement;
};

type EndIcon = {
  endIcon: ReactElement;
};

type Icon = {
  icon: ReactElement;
};

type SubLabel = {
  subLabel: ReactNode;
};

type Tag = {
  tag: ReactElement;
};

type ConfigurableVerticalProps = StartIcon & EndIcon & SubLabel & Tag;

type IgnoreConfigurableVerticalParams<K extends keyof ConfigurableVerticalProps> = Never<
  Omit<ConfigurableVerticalProps, K>
>;

type OnlyLabelVertical = Label & Never<ConfigurableVerticalProps>;
type OnlyStartIcon = StartIcon & IgnoreConfigurableVerticalParams<keyof StartIcon>;
type OnlyEndIcon = EndIcon & IgnoreConfigurableVerticalParams<keyof EndIcon>;
type OnlyStartIconAndEndIcon = StartIcon & EndIcon & IgnoreConfigurableVerticalParams<keyof (StartIcon & EndIcon)>;
type OnlySubLabel = SubLabel & IgnoreConfigurableVerticalParams<keyof SubLabel>;
type OnlyStartIconAndSubLabelAndTag = StartIcon &
  SubLabel &
  Tag &
  IgnoreConfigurableVerticalParams<keyof (StartIcon & SubLabel & Tag)>;

type OnlyLabelHorizontal = Label & Never<Icon>;
type OnlyIcon = Icon & Never<Label>;
type OnlyLabelAndIcon = Label & Icon;

type VerticalProps = {
  vertical: true;
} & (
  | OnlyLabelVertical
  | (Label & (OnlyStartIcon | OnlyEndIcon | OnlyStartIconAndEndIcon | OnlySubLabel | OnlyStartIconAndSubLabelAndTag))
);

type HorizontalProps = {
  horizontal: true;
} & (OnlyLabelHorizontal | OnlyIcon | OnlyLabelAndIcon);

type OnlyVerticalProps = VerticalProps & Never<Omit<HorizontalProps, keyof Label>>;
type OnlyHorizontalProps = HorizontalProps & Never<Omit<VerticalProps, keyof Label>>;

export type NavigationItemProps = CommonProps & (OnlyVerticalProps | OnlyHorizontalProps);
