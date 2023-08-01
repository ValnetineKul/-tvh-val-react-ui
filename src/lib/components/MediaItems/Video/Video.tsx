import type { FC, VideoHTMLAttributes, IframeHTMLAttributes } from 'react';
import React, { useEffect, useState } from 'react';
import { ReactComponent as FallbackImage } from './assets/fallbackImage.svg';
import getYouTubeVideoId from './helpers/getYouTubeVideoId';
import getVimeoVideoId from './helpers/getVimeoVideoId';
import useStyles from './Video.styles';

export type VideoProps = VideoHTMLAttributes<HTMLElement> | IframeHTMLAttributes<HTMLElement>;

const Video: FC<VideoProps> = ({ src, className, ...props }) => {
  const { classes, cx } = useStyles();
  const [isFallbackVisible, setIsFallbackVisible] = useState(src === undefined);
  const handleError = () => {
    setIsFallbackVisible(true);
  };

  useEffect(() => {
    return () => {
      setIsFallbackVisible(false);
    };
  }, [src]);

  const youtubeId = src && getYouTubeVideoId(src);
  const vimeoId = src && getVimeoVideoId(src);

  const generateYouTubeUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const generateVimeoUrl = (videoId: string): string => {
    return `https://player.vimeo.com/video/${videoId}`;
  };

  const renderVideo = () => {
    if (youtubeId || vimeoId) {
      return (
        <div className={classes.container}>
          <iframe
            src={(youtubeId && generateYouTubeUrl(youtubeId)) || (vimeoId && generateVimeoUrl(vimeoId))}
            loading="lazy"
            allowFullScreen
            title={props.title || `${youtubeId ? 'YouTube' : 'Vimeo'} video`}
            className={classes.iframe}
            {...props}
          />
        </div>
      );
    }

    return (
      /* eslint-disable jsx-a11y/media-has-caption */
      <video
        controls
        controlsList="nodownload"
        disablePictureInPicture
        src={src}
        className={classes.root}
        onError={handleError}
        {...props}
      >
        Your browser does not support the video tag.
      </video>
      /* eslint-enable jsx-a11y/media-has-caption */
    );
  };

  return isFallbackVisible ? (
    <FallbackImage className={cx(classes.root, className)} aria-label="placeholder" />
  ) : (
    renderVideo()
  );
};

export default Video;
