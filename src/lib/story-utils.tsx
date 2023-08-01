import type { ArgType } from '@storybook/addons';
import type { Story, Meta } from '@storybook/react';
import type { ComponentType, ExoticComponent } from 'react';
import React from 'react';

type AnyComponent<Props> = ComponentType<Props> | ExoticComponent<Props>;

type CustomStory<Props> = Omit<Story, 'args'> & { args: Props };

type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type { CustomStory as Story };

export function createTemplate<Props>(Component: AnyComponent<Props>): StoryTemplate<Props>;
export function createTemplate<Props, DefaultProps extends Partial<Props>>(
  Component: AnyComponent<Props>,
  defaultProps: DefaultProps | ((args: Partial<Props>) => DefaultProps)
): StoryTemplate<OptionalKeys<Props, keyof DefaultProps & keyof Props>>;
export function createTemplate<Props>(Component: AnyComponent<Props>, defaultProps?: unknown): StoryTemplate<Props> {
  return ((args: Props) => {
    const secondaryProps = typeof defaultProps === 'function' ? defaultProps(args) : defaultProps;
    return <Component {...(secondaryProps || {})} {...args} />;
  }) as unknown as StoryTemplate<Props>;
}

export type StoryTemplate<T> = Omit<ComponentType<T>, 'bind'> & {
  bind: (thisArg: unknown) => CustomStory<T>;
};

type CustomArgType<Value = unknown> = ArgType & {
  defaultValue?: Value;
  control?:
    | {
        disable?: boolean;
        [key: string]: unknown;
      }
    | string;
  table?: {
    type?:
      | {
          /** Consider using `detail` */
          summary?: string;
          detail?: string;
          [key: string]: unknown;
        }
      | string;
    [key: string]: unknown;
  };
};

type ArgTypes<Props> = {
  [key in keyof Props]?: CustomArgType<Props[key]>;
};

type CustomMeta<Props> = Omit<Meta<Props>, 'component'> & {
  component: AnyComponent<Props> | null;
  argTypes?: ArgTypes<Props> & {
    [key in string]?: CustomArgType<unknown>;
  };
};

export type { CustomMeta as Meta };

export function createMeta<Props>(meta: CustomMeta<Props>): CustomMeta<Props> {
  return meta;
}
