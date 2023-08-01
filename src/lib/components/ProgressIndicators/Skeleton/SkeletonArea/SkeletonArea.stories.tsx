import { createMeta, createTemplate } from '../../../../story-utils';
import SkeletonArea from './SkeletonArea';

const Template = createTemplate(SkeletonArea);

export const Primitive = Template.bind({});
Primitive.args = {
  width: 200,
  height: 200,
};
Primitive.storyName = 'SkeletonArea';

export default createMeta({
  component: SkeletonArea,
  title: 'Components/ProgressIndicators/Skeleton/SkeletonArea',
});
