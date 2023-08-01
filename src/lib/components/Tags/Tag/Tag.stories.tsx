import React from 'react';
import { createMeta, createTemplate } from '../../../story-utils';
import Icon from '../../Icon';
import { User } from '../../Icon/icons/functional';
import Tag from './Tag';

const Template = createTemplate(Tag);

export const Primitive = Template.bind({});
Primitive.args = {
  color: 'primary',
  size: 'md',
  label: 'Tag',
};

Primitive.storyName = 'tag';

export const StartIcon = Template.bind({});
StartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={User} />,
};
StartIcon.storyName = 'startIcon';

export default createMeta({
  component: Tag,
  title: 'Components/Tags/Tag',
  argTypes: {
    startIcon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon component' },
      },
    },
  },
});
