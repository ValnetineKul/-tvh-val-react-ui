import type { ComponentProps } from 'react';
import React from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import ChoiceChip from '../ChoiceChip';
import ChipGroup from './ChipGroup';

type Props = ComponentProps<typeof ChipGroup>;
type Args = Omit<Props, 'children'>;

const labels = ['Total Source', 'Deutz', 'CAM', 'Baldwin', 'Danfoss'];

const Template = ((args: Args) => (
  <ChipGroup {...args}>
    {labels.map((label, index) => {
      return <ChoiceChip label={label} key={index} />;
    })}
  </ChipGroup>
)) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  fillContent: false,
};

Primitive.storyName = 'ChipGroup';

export default createMeta({
  component: ChipGroup,
  title: 'Components/Chips/ChipGroup',
});
