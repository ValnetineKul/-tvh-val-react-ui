import { createMeta, createTemplate } from '../../story-utils';
import NumberFormat from './NumberFormat';

const Template = createTemplate(NumberFormat);

export const Primitive = Template.bind({});
Primitive.args = {
  number: 123456.75,
};
Primitive.storyName = 'NumberFormat';

export default createMeta({
  component: NumberFormat,
  title: 'Components/Content/NumberFormat',
});
