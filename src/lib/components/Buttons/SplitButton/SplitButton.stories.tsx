import React from 'react';
import { createMeta, createTemplate } from '../../../story-utils';
import { ShoppingBasket } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import SplitButton from './SplitButton';

const Template = createTemplate(SplitButton);

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
};
Primitive.argTypes = {
  icon: {
    control: {
      disable: true,
    },
  },
};
Primitive.storyName = 'label';

export const Icons = Template.bind({});
Icons.args = {
  icon: <Icon icon={ShoppingBasket} />,
};
Icons.argTypes = {
  label: {
    table: {
      disable: true,
    },
  },
};
Icons.storyName = 'icon';

export default createMeta({
  component: SplitButton,
  title: 'Components/Buttons/SplitButton',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    onDropdownClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
  },
});
