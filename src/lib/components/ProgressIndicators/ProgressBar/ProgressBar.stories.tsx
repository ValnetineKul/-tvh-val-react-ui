import { createMeta, createTemplate } from '../../../story-utils';
import ProgressBar from './ProgressBar';

const Template = createTemplate(ProgressBar);

export const Primitive = Template.bind({});
Primitive.args = {
  progress: 50,
};

Primitive.storyName = 'ProgressBar';

export const WithLabel = Template.bind({});
WithLabel.args = {
  progress: 50,
  endLabel: '500',
};

WithLabel.storyName = 'WithEndLabel';

export default createMeta({
  component: ProgressBar,
  title: 'Components/ProgressIndicators/ProgressBar',
  argTypes: {
    progress: {
      table: {
        type: {
          detail: 'percentage (0-100)',
        },
      },
    },
    endLabel: {
      table: {
        type: {
          detail: 'progress information label',
        },
      },
      control: {
        disable: true,
      },
    },
  },
});
