import type { ComponentProps } from 'react';
import React from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import BackToTopButton from './BackToTopButton';

type Props = ComponentProps<typeof BackToTopButton>;

const Template = ((args: Props) => (
  <div style={{ padding: 16, height: window.screen.height * 4 }}>
    <p>The button appears when users scroll 2 pages down and move the scroll bar up or scroll up on the page.</p>
    <BackToTopButton {...args} />
  </div>
)) as StoryTemplate<Props>;

export const Primitive = Template.bind({});

Primitive.storyName = 'BackToTopButton';

export default createMeta({
  component: BackToTopButton,
  title: 'Components/Buttons/BackToTopButton',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
