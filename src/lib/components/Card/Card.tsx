import { default as MuiCard } from '@mui/material/Card';
import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import filterEvents from '../../helpers/filterEvents';
import Surface from '../Surfaces/Surface';
import CardImage from './CardImage/CardImage';
import useStyles from './Card.styles';

const TIME_FOR_TEXT_SELECTING = 200;

export interface CardProps {
  image?: {
    image: string;
    imgSize?: 'contain' | 'cover';
  };
  className?: string;
  wrapper?: React.ReactElement;
  direction?: 'vertical' | 'horizontal';
}

const Card: FC<CardProps> = ({ image, className, wrapper, direction = 'horizontal', children }) => {
  const { classes, cx } = useStyles();
  const rootClassName = (classes as Record<string, string>)[`root${capitalize(direction)}`];

  const ref = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  let mouseDownTimeStamp: number;
  let mouseUpTimeStamp: number;

  const handleCardMouseDown = () => {
    mouseDownTimeStamp = +new Date();
  };

  const handleCardMouseUp = () => {
    mouseUpTimeStamp = +new Date();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!wrapper) return;

    const [isTabableElement, isDescendentOfTabableElements, isElementOutsideDomTree] = filterEvents(event);

    if (!ref.current || isTabableElement || isDescendentOfTabableElements || isElementOutsideDomTree) {
      return;
    }

    if (!mouseUpTimeStamp || !mouseDownTimeStamp || mouseUpTimeStamp - mouseDownTimeStamp < TIME_FOR_TEXT_SELECTING) {
      ref.current.click();
    }
  };

  return (
    <MuiCard
      className={cx(classes.root, rootClassName, { [classes.hasHover]: !!wrapper }, className)}
      elevation={0}
      color="100"
      border
      tabIndex={wrapper ? 0 : undefined}
      onClick={handleCardClick}
      onMouseDown={handleCardMouseDown}
      onMouseUp={handleCardMouseUp}
      onKeyPress={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleCardClick(event);
        }
      }}
      component={Surface}
    >
      {wrapper &&
        React.cloneElement(wrapper, {
          ref,
          tabIndex: -1,
          className: cx(classes.visuallyHidden, wrapper.props.className),
        })}
      {image && <CardImage {...image} direction={direction} />}
      <div className={classes.content}>{children}</div>
    </MuiCard>
  );
};
export default Card;
