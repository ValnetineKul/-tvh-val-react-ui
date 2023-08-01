import type { FC, ComponentProps } from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Typography from './Typography';

const Template = createTemplate(Typography as FC<ComponentProps<typeof Typography>>);

const Primitive = Template.bind({});
Primitive.args = {
  children: 'Sample text',
  headerType: 'functional',
  variant: 'h1',
};

export const Heading1 = Template.bind({});
Heading1.args = {
  ...Primitive.args,
  variant: 'h1',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  ...Primitive.args,
  variant: 'h2',
};

export const Heading3 = Template.bind({});
Heading3.args = {
  ...Primitive.args,
  variant: 'h3',
};

export const Heading4 = Template.bind({});
Heading4.args = {
  ...Primitive.args,
  variant: 'h4',
};

export const Heading5 = Template.bind({});
Heading5.args = {
  ...Primitive.args,
  variant: 'h5',
};
export const Heading6 = Template.bind({});
Heading6.args = {
  ...Primitive.args,
  variant: 'h6',
};

export default createMeta({
  component: Typography as FC<ComponentProps<typeof Typography>>,
  title: 'Foundations/Typography/Headings',
  argTypes: {
    weight: {
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
