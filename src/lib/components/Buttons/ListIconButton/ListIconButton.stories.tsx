import { createMeta, createTemplate } from '../../../story-utils';
import ListIconButton from './ListIconButton';

const Template = createTemplate(ListIconButton);

export const Primitive = Template.bind({});
Primitive.args = {
  size: 'md',
  checked: false,
  disabled: false,
  onClick: () => {},
};

Primitive.storyName = 'ListIconButton';

export default createMeta({
  component: ListIconButton,
  title: 'Components/Buttons/ListIconButton',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
    },
  },
});
