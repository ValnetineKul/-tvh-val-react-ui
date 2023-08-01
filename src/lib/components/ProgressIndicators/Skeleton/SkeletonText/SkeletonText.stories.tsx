import { createMeta, createTemplate } from '../../../../story-utils';
import SkeletonText from './SkeletonText';

const Template = createTemplate(SkeletonText);

export const Primitive = Template.bind({});
Primitive.args = {
  heading: 'h1',
  body: 'body1',
  bodyLinesCount: 3,
  width: '100%',
};
Primitive.storyName = 'SkeletonText';

export default createMeta({
  component: SkeletonText,
  title: 'Components/ProgressIndicators/Skeleton/SkeletonText',
  argTypes: {
    headingClassName: {
      control: {
        disable: true,
      },
    },
    bodyTextClassName: {
      control: {
        disable: true,
      },
    },
    lastLineClassName: {
      control: {
        disable: true,
      },
    },
  },
});
