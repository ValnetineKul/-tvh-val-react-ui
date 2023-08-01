import { createMeta, createTemplate } from '../../../story-utils';
import FlagTag from './FlagTag';
import { Sparkles } from '../../Icon/icons/functional';

const Template = createTemplate(FlagTag);

export const Primitive = Template.bind({});

Primitive.args = {
  icon: Sparkles,
  size: 'md',
  message: 'label',
  hasLabel: true,
};

Primitive.storyName = 'FlagTag';

export default createMeta({
  component: FlagTag,
  title: 'Components/Tags/FlagTag',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
    },
  },
});
