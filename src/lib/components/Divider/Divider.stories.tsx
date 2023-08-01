import type { DecoratorFn } from '@storybook/react';
import React from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Divider from './Divider';

const Template = createTemplate(Divider);

export const Primitive = Template.bind({});
Primitive.args = {
  direction: 'horizontal',
};

Primitive.storyName = 'Divider';

const decorator: DecoratorFn = (Story, { args }) =>
  args.direction === 'vertical' ? (
    <div style={{ display: 'flex' }}>
      <br />
      {Story()}
      <br />
    </div>
  ) : (
    Story()
  );

export default createMeta({
  component: Divider,
  title: 'Components/Dividers/Divider',
  decorators: [decorator],
});
