import React from 'react';
import { createMeta, createTemplate } from '../../../story-utils';
import Icon from '../../Icon';
import { Plus } from '../../Icon/icons/functional';
import IconButton from './IconButton';

const Template = createTemplate(IconButton);

const Primitive = Template.bind({});
Primitive.args = {
  icon: <Icon icon={Plus} />,
  size: 'md',
  disabled: false,
  onClick: () => {},
  tooltipLabel: 'Tooltip text',
};

export const Default = Template.bind({});
Default.args = {
  ...Primitive.args,
};

export default createMeta({
  component: IconButton,
  title: 'Components/Buttons/IconButton',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
    },
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
    },
  },
  parameters: {
    componentSubtitle: '',
  },
});
