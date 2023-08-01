import { action } from '@storybook/addon-actions';
import { createMeta, createTemplate } from '../../../story-utils';
import Toast from './Toast';

const Template = createTemplate(Toast);

export const Primitive = Template.bind({});

Primitive.args = {
  message: 'Very long toast message which is multiline',
  status: 'success',
  button: {
    label: 'Longer Label',
    action: action('onButtonClick'),
  },
  closeAction: action('onCloseClick'),
};
Primitive.storyName = 'Toast';

export default createMeta({
  component: Toast,
  title: 'Components/Toasts/Toast',
  argTypes: {
    button: {
      control: { disable: true },
    },
  },
});
