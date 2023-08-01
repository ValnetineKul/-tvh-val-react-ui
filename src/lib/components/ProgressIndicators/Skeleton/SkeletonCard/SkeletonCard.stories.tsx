import React from 'react';
import { createMeta, createTemplate } from '../../../../story-utils';
import SkeletonCard from './SkeletonCard';
import SkeletonArea from '../SkeletonArea/SkeletonArea';
import SkeletonText from '../SkeletonText/SkeletonText';

const Template = createTemplate(SkeletonCard);

export const Primitive = Template.bind({});
Primitive.args = {
  width: 300,
  children: (
    <>
      <SkeletonArea width="100%" height={200} />
      <div style={{ padding: '20px' }}>
        <SkeletonText width="100%" heading="h2" bodyLinesCount={5} />
      </div>
    </>
  ),
};
Primitive.storyName = 'SkeletonCard';

export default createMeta({
  component: SkeletonCard,
  title: 'Components/ProgressIndicators/Skeleton/SkeletonCard',
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
});
