import { createMeta, createTemplate } from '../../../../story-utils';
import SkeletonTable from './SkeletonTable';

const Template = createTemplate(SkeletonTable);

export const Primitive = Template.bind({});
Primitive.args = {
  cols: 5,
  rows: 3,
};
Primitive.storyName = 'SkeletonTable';

export default createMeta({
  component: SkeletonTable,
  title: 'Components/ProgressIndicators/Skeleton/SkeletonTable',
});
