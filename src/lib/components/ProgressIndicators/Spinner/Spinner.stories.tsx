import { createMeta, createTemplate } from '../../../story-utils';
import Spinner from './Spinner';

const Template = createTemplate(Spinner);

export const Primitive = Template.bind({});
Primitive.storyName = 'Spinner';
Primitive.args = {
  size: 'md',
};

export default createMeta({
  title: 'components/ProgressIndicators/Spinner/Spinner',
  component: Spinner,
  argTypes: {
    spinnerClassName: {
      control: {
        disable: true,
      },
    },
  },
});
