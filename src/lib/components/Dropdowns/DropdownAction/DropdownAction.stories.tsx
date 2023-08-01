import { action } from '@storybook/addon-actions';
import { createMeta, createTemplate } from '../../../story-utils';
import DropdownAction from './DropdownAction';

const Template = createTemplate(DropdownAction);

export const Primitive = Template.bind({});

Primitive.args = {
  label: 'label',
  onClick: action('onItemClick'),
};

Primitive.storyName = 'DropdownAction';

export default createMeta({
  component: DropdownAction,
  title: 'Components/Dropdowns/DropdownAction',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
    },
  },
});
