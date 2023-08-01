import type { FC, ComponentProps } from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Typography from './Typography';

const Template = createTemplate(Typography as FC<ComponentProps<typeof Typography>>);

const Primitive = Template.bind({});
Primitive.args = {
  children: 'Sample text',
  weight: 'regular',
};

export const Body600 = Template.bind({});
Body600.args = {
  ...Primitive.args,
  variant: 'body600',
};

export const Body500 = Template.bind({});
Body500.args = {
  ...Primitive.args,
  variant: 'body500',
};

export const Body400 = Template.bind({});
Body400.args = {
  ...Primitive.args,
  variant: 'body400',
};

export const Body300 = Template.bind({});
Body300.args = {
  ...Primitive.args,
  variant: 'body300',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primitive.args,
  secondary: true,
};

export default createMeta({
  component: Typography as FC<ComponentProps<typeof Typography>>,
  title: 'Foundations/Typography/Body',
  argTypes: {
    headerType: {
      table: {
        disable: true,
      },
    },
    variantMapping: {
      table: {
        disable: true,
      },
    },
    component: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'React or HTML element type' },
        defaultValue: { summary: 'span' },
      },
    },
  },
});
