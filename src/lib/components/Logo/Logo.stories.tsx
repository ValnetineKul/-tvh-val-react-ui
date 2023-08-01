import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { createMeta } from '../../story-utils';

type Props = React.ComponentProps<typeof Logo>;
const Template = (args: Props) => <Logo {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  variant: 'positive',
  alt: 'Logo alternative text',
  size: 'sm',
  component: Link,
  to: '/whereToGoTo',
  bepcoVariant: 'company',
};
Primitive.storyName = 'Logo';

export default createMeta({
  component: Logo,
  title: 'Foundations/Logo',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
    },
    component: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'React.ReactElement' },
      },
    },
    href: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'If "href" is filled, the component will immediately transform to HTML link tag "a"' },
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    download: {
      control: {
        disable: true,
      },
    },
  },
});
