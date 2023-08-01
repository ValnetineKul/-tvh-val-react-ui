import React, { useState } from 'react';
import type { ComponentProps } from 'react';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import Timeline from './Timeline';
import { FileCheck, Inbox, ResearchRequest } from '../../Icon/icons/functional';
import Button from '../../Buttons/Button';

type Props = ComponentProps<typeof Timeline>;

const items: Props['items'] = [
  {
    label: 'Received',
    icon: Inbox,
    description: 'We have received your request.',
    hasWarning: false,
  },
  {
    label: 'Research',
    icon: ResearchRequest,
    description: ['Our researchers are looking for your parts.', 'Description line 2', 'Third description'],
    hasWarning: true,
  },
  {
    label: 'Resolved',
    icon: FileCheck,
    description: 'Our researchers are looking for your parts.',
    hasWarning: false,
  },
];

type Args = Omit<Props, 'activeItem'>;

const Template = ((args: Args) => {
  const [activeItem, setActiveItem] = useState(0);
  const isEveryStepCompleted: boolean = activeItem === items.length;

  const handleNext = () => {
    setActiveItem(activeItem + 1);
  };

  const handleReset = () => {
    setActiveItem(0);
  };

  return (
    <>
      <Timeline {...args} activeItem={activeItem} />

      <div style={{ paddingTop: 16 }}>
        {!isEveryStepCompleted ? (
          <Button variant="primary" type="button" onClick={handleNext} label="Next" />
        ) : (
          <Button variant="primary" type="button" onClick={handleReset} label="Reset" />
        )}
      </div>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  items,
  direction: 'horizontal',
  isAltering: false,
};

Primitive.storyName = 'WithDescription';

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  items: items.map(({ description, ...item }) => {
    return item;
  }),
  direction: 'horizontal',
  isAltering: false,
};

WithoutDescription.storyName = 'WithoutDescription';

export default createMeta({
  component: Timeline,
  title: 'Components/ProgressIndicators/Timeline',
  argTypes: {
    activeItem: {
      control: {
        disable: true,
      },
    },
    items: {
      control: {
        disable: true,
      },
    },
  },
});
