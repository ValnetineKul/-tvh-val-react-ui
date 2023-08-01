import type { ComponentProps } from 'react';
import React from 'react';
import { createMeta } from '../../story-utils';
import Typography from '../Typography';
import Surface from '../Surfaces/Surface';
import Container from './Container';

type Props = ComponentProps<typeof Container>;
const Template = (args: Props) => <Container {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  children: (
    <Surface color="150" style={{ height: '50vh' }}>
      <Typography variant="body500">Container content</Typography>
    </Surface>
  ),
  disableGutters: false,
};

Primitive.storyName = 'Container';

export default createMeta({
  component: Container,
  title: 'Foundations/Container',
  parameters: {
    layout: 'fullscreen',
  },
});
