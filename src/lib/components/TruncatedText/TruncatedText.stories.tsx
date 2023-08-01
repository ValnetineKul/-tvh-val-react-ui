import { createMeta, createTemplate } from '../../story-utils';
import TruncatedText from './TruncatedText';

const Template = createTemplate(TruncatedText);

export const Primitive = Template.bind({});
Primitive.args = {
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque nunc ut dignissim gravida.
  Cras dapibus, augue eu mollis lacinia, lectus risus elementum est, et dignissim leo velit in mauris. `,
};

Primitive.storyName = 'TruncatedText';

export default createMeta({
  component: TruncatedText,
  title: 'Components/TruncatedText/TruncatedText',
});
