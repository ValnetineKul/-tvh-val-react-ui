import React from 'react';
import { createMeta } from '../../../story-utils';
import CardContent from './CardContent';

const Template = () => (
  <CardContent>
    <span>Card content</span>
  </CardContent>
);
export const Primitive = Template.bind({});

Primitive.args = {};

Primitive.storyName = 'CardContent';

export default createMeta({
  component: CardContent,
  title: 'Components/Cards/CardContent',
});
