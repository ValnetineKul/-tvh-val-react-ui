import { createMeta, createTemplate } from '../../story-utils';
import LimitedText from './LimitedText';

const Template = createTemplate(LimitedText);

export const Primitive = Template.bind({});
Primitive.args = {
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque nunc ut dignissim gravida.`,
};

Primitive.storyName = 'LimitedText';

export default createMeta({
  component: LimitedText,
  title: 'Components/TruncatedText/LimitedText',
});
