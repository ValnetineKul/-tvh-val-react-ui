import React from 'react';
import { Forklift } from '../../../Icon/icons/functional';
import { createMeta } from '../../../../story-utils';
import type { StoryTemplate } from '../../../../story-utils';
import TimelineItem from './TimelineItem';

type Props = React.ComponentProps<typeof TimelineItem>;

const Template = ((args: Props) => {
  return <TimelineItem {...args} />;
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  icon: Forklift,
  description: 'Description',
  direction: 'horizontal',
  isCompleted: false,
  isCurrent: false,
  hasWarning: false,
};
Primitive.storyName = 'TimelineItem';

export default createMeta({
  component: TimelineItem,
  title: 'Components/ProgressIndicators/Timeline/TimelineItem',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
    },
  },
});
