import type { ComponentProps } from 'react';
import React from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta, createTemplate } from '../../../story-utils';
import { Comment } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import BackToTopButton from '../BackToTopButton';
import FloatingActionButton from './FloatingActionButton';

const Template = createTemplate(FloatingActionButton);

type Props = ComponentProps<typeof FloatingActionButton>;

const TemplateFloatingActionsGroup = ((args: Props) => {
  return (
    <div style={{ padding: 16, height: window.screen.height * 4 }}>
      <p>
        The BackToTopButton appears when users scroll 2 pages down and move the scroll bar up or scroll up on the page.
      </p>
      <FloatingActionButton {...args} />
      <BackToTopButton />
    </div>
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  icon: <Icon icon={Comment} />,
  onClick: () => {},
};

Primitive.storyName = 'floatingActionButton';

export const FloatingActionsGroup = TemplateFloatingActionsGroup.bind({});
FloatingActionsGroup.args = {
  ...Primitive.args,
};

FloatingActionsGroup.storyName = 'floatingActionsGroup';

export default createMeta({
  component: FloatingActionButton,
  title: 'Components/Buttons/FloatingActionButton',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    onClick: {
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
      action: { argTypesRegex: '^on.*' },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
