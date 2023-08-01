import { createMeta, createTemplate } from '../../../story-utils';
import Video from './Video';

const Template = createTemplate(Video);

export const Primitive = Template.bind({});
Primitive.args = {
  src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
};
Primitive.storyName = 'SelfHosted';

export const YouTubeVideo = Template.bind({});
YouTubeVideo.args = {
  src: 'https://www.youtube.com/watch?v=QkB12AuMfpQ',
  title: 'TVH Group corporate movie ENG',
};
YouTubeVideo.storyName = 'YouTube';

export const VimeoVideo = Template.bind({});
VimeoVideo.args = {
  src: 'https://vimeo.com/639899860',
  title: 'Happy 2022 from TVH on Vimeo',
};
VimeoVideo.storyName = 'Vimeo';

export const Fallback = Template.bind({});
Fallback.args = {
  src: './notextsting.mp4',
};

export default createMeta({
  component: Video,
  title: 'Components/MediaItems/Video',
  argTypes: {
    src: {
      table: {
        type: { summary: 'Video file / url' },
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
});
