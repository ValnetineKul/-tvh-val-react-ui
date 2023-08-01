import React from 'react';
import { screen, render, userEvent } from '../../../test-utils';

import Video from './Video';

const selfHostedVideoProps = {
  src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
  className: 'custom-class',
};

const youTubeVideoProps = {
  src: 'https://www.youtube.com/watch?v=QkB12AuMfpQ',
  title: 'TVH Group corporate movie ENG',
};

const vimeoVideoProps = {
  src: 'https://vimeo.com/639899860',
  title: 'Happy 2022 from TVH on Vimeo',
};

describe('Video', () => {
  it('Should render videoplayer with self hosted video', () => {
    const { container } = render(<Video {...selfHostedVideoProps} />);
    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('Should render videoplayer with YouTube video', () => {
    render(<Video {...youTubeVideoProps} />);
    expect(screen.getByTitle('TVH Group corporate movie ENG')).toBeInTheDocument();
  });

  it('Should render videoplayer with Vimeo video', () => {
    render(<Video {...vimeoVideoProps} />);
    expect(screen.getByTitle('Happy 2022 from TVH on Vimeo')).toBeInTheDocument();
  });

  it('Should show the fallback image instead of video', () => {
    const { container } = render(<Video src="moviesample.mp4" />);
    const video = container.firstChild as HTMLElement;
    userEvent.error(video);
    const fallbackImage = container.querySelector('svg');
    expect(fallbackImage).toBeInTheDocument();
    expect(video).not.toBeInTheDocument();
  });

  it('Should render fallback image when video is not passed', () => {
    const { container } = render(<Video src={undefined} />);
    const fallbackImage = container.querySelector('svg');
    expect(fallbackImage).toBeInTheDocument();
  });
});
