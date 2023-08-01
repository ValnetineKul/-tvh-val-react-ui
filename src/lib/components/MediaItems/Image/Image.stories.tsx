import { createMeta, createTemplate } from '../../../story-utils';
import Image from './Image';
import filterImg from './mocked-assets/filter.jpg';

const Template = createTemplate(Image);

export const Primitive = Template.bind({});
Primitive.args = {
  src: filterImg,
  alt: 'Alt text',
};
Primitive.argTypes = {
  fallback: {
    control: {
      disable: true,
    },
  },
};
Primitive.storyName = 'Image';

export const Fallback = Template.bind({});
Fallback.args = {
  src: './wrongSrc.jpg',
  alt: 'Alt text',
  fallback: 'image',
};

export default createMeta({
  component: Image,
  title: 'Components/MediaItems/Image',
  argTypes: {
    src: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Image file / url' },
      },
    },
    fallbackClassName: {
      control: {
        disable: true,
      },
    },
  },
});
