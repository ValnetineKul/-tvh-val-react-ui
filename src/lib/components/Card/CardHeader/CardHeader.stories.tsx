import React from 'react';
import { createMeta } from '../../../story-utils';
import CardHeader from './CardHeader';

const Template = (args: React.ComponentProps<typeof CardHeader>) => <CardHeader {...args} />;

export const Primitive = Template.bind({});

Primitive.args = {
  title: 'Card Header',
  subtitle: 'Subtitle',
};

Primitive.storyName = 'CardHeader';

export default createMeta({
  component: CardHeader,
  title: 'Components/Cards/CardHeader',
});
