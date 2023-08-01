import { createMeta, createTemplate } from '../../../story-utils';
import StatusTag from './StatusTag';

const Template = createTemplate(StatusTag);

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Success',
};

Primitive.storyName = 'StatusTag';

export default createMeta({
  component: StatusTag,
  title: 'Components/Tags/StatusTag',
  parameters: {
    componentSubtitle: '',
  },
  argTypes: {
    label: {},
    subLabel: {},
    className: {
      table: {
        disable: true,
      },
    },
  },
});
