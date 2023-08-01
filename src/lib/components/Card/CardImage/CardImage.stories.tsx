import React from 'react';
import { createMeta } from '../../../story-utils';
import filterImage from '../mocked-assets/filter.jpg';
import CardImage from './CardImage';

const Template = (args: React.ComponentProps<typeof CardImage>) => {
  return (
    <div style={{ width: 400, height: 400 }}>
      <CardImage {...args} />
    </div>
  );
};

export const Primitive = Template.bind({});

Primitive.args = {
  image: filterImage,
  direction: 'vertical',
};

Primitive.storyName = 'CardImage';

export default createMeta({
  component: CardImage,
  title: 'Components/Cards/CardImage',
  argTypes: {
    image: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Image source' },
      },
    },
    direction: {
      control: {
        disable: true,
      },
      table: {
        type: { detail: 'Used by developer to align aspect ratio for horizontal and vertical cards' },
      },
    },
  },
});
