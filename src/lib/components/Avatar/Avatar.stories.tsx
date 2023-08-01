import React from 'react';
import Avatar from './Avatar';
import { createMeta } from '../../story-utils';
import testImg from './mocked-assets/image.png';

type Props = React.ComponentProps<typeof Avatar>;
const Template = (args: Props) => <Avatar {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  size: 'sm',
  imageSrc: testImg,
};
Primitive.storyName = 'Image';

export const Fallback = Template.bind({});
Fallback.args = {
  size: 'sm',
  imageSrc: './wrong-url.png',
};
Fallback.storyName = 'ImageFallback';

export const Text = Template.bind({});
Text.args = {
  size: 'sm',
  text: 'JD',
};

export const Icon = Template.bind({});
Icon.args = {
  size: 'sm',
};

export default createMeta({
  component: Avatar,
  title: 'Components/Avatars/Avatar',
  argTypes: {
    imageAlt: {
      control: {
        disable: true,
      },
    },
    imageSrc: {
      control: {
        disable: true,
      },
    },
    icon: {
      control: {
        disable: true,
      },
    },
  },
});
