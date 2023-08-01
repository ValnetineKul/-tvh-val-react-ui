import React from 'react';
import AccordionSummary from './AccordionSummary';
import { createMeta } from '../../../story-utils';

const Template = (args: React.ComponentProps<typeof AccordionSummary>) => <AccordionSummary {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  title: 'Title',
  id: 'item-id',
  expanded: false,
};

Primitive.storyName = 'AccordionSummary';

export default createMeta({
  component: AccordionSummary,
  title: 'Components/Accordions/AccordionSummary',
  argTypes: {
    title: {
      control: {
        disable: true,
      },
    },
  },
});
