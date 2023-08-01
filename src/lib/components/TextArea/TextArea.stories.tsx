import { createMeta, createTemplate } from '../../story-utils';
import TextArea from './TextArea';

const Template = createTemplate(TextArea);

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  rows: 2,
  maxLength: 500,
};
Primitive.storyName = 'TextArea';

export default createMeta({
  component: TextArea,
  title: 'Components/InputFields/TextArea',
  argTypes: {
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    inputRef: {
      table: {
        disable: true,
      },
    },
    value: {
      control: {
        disable: true,
      },
    },
  },
});
