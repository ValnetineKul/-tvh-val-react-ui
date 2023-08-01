import { action } from '@storybook/addon-actions';
import { createMeta, createTemplate } from '../../story-utils';
import InlineMessage from './InlineMessage';

const Template = createTemplate(InlineMessage);

export const Primitive = Template.bind({});
Primitive.args = {
  size: 'md',
  status: 'success',
  message: 'Inline message.',
  actionLabel: 'Action',
  onAction: action('onAction'),
};

Primitive.storyName = 'InlineMessage';

export default createMeta({
  component: InlineMessage,
  title: 'Components/InlineMessages/InlineMessage',
  argTypes: {
    status: {
      options: ['success', 'error', 'warning', 'info', 'loading', undefined],
      control: {
        type: 'select',
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    buttonProps: {
      table: {
        disable: true,
      },
    },
    component: {
      control: {
        disable: true,
      },
    },
  },
});
