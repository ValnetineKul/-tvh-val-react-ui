import { createMeta, createTemplate } from '../../story-utils';
import CurrencyFormat from './CurrencyFormat';

const Template = createTemplate(CurrencyFormat);

export const Primitive = Template.bind({});
Primitive.args = {
  value: 123456.75,
};
Primitive.storyName = 'CurrencyFormat';

export default createMeta({
  component: CurrencyFormat,
  title: 'Components/Content/CurrencyFormat',
});
