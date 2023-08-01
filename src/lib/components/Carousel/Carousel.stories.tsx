import { action } from '@storybook/addon-actions';
import React from 'react';
import type { ComponentProps } from 'react';
import { makeStyles } from '../../../themes/core';
import useScreenSize from '../../hooks/useScreenSize';
import type { StoryTemplate } from '../../story-utils';
import { createTemplate, createMeta } from '../../story-utils';
import { Card, CardHeader, CardContent, CardFooter } from '../Card';
import Button from '../Buttons/Button';
import Typography from '../Typography';
import Image from '../MediaItems/Image';
import filterImage from '../Card/mocked-assets/filter.jpg';
import CatWithDots from './mocked-assets/catWithDots.png';
import BlondCat from './mocked-assets/blondCat.png';
import RedCat from './mocked-assets/redCat.png';
import BlueCat from './mocked-assets/blueCat.png';
import Carousel from './Carousel';

const useStyles = makeStyles()(() => ({
  image: {
    width: '100%',
    height: 189,
    objectFit: 'cover',
  },
}));

type Props = ComponentProps<typeof Carousel>;

const slides = new Array(6).fill(null).map((_, idx) => {
  return (
    <Card direction="vertical" image={{ image: filterImage }}>
      <CardHeader title="Card Header" subtitle="Subtitle" />
      <CardContent>{`Slide ${idx + 1}`}</CardContent>
      <CardFooter>
        <Button label="Action button" variant="primary" onClick={action('onClick')} />
      </CardFooter>
    </Card>
  );
});

const slidesWithFallback = new Array(10).fill(null).map((_, idx) => {
  return <Image src="test.png" alt={`${idx}`} fallback="image" />;
});

const Template = createTemplate(Carousel);

const TemplateWithImages = ((args: Props) => {
  const { isTabletUp } = useScreenSize('Tablet');
  const isMobile = !isTabletUp;

  const { classes } = useStyles();
  return (
    <Carousel
      {...args}
      slides={[
        <Image src={CatWithDots} alt="cat with dots" className={classes.image} />,
        <Image src={BlondCat} alt="blond cat" className={classes.image} />,
        <Image src={RedCat} alt="red cat" className={classes.image} />,
        <Image src={BlueCat} alt="blue cat" className={classes.image} />,
      ]}
      slidesPerView={isMobile ? 1 : 3}
    />
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  slides,
  slidesPerView: 2.5,
  navigationPosition: 'topRight',
  title: 'Title',
};
Primitive.storyName = 'WithCards';

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  ...Primitive.args,
  title: (
    <Typography headerType="functional" variant="h3">
      Custom Title
    </Typography>
  ),
  slides: slidesWithFallback,
  slidesPerView: undefined,
};
WithCustomTitle.storyName = 'WithCustomTitle';

export const WithImages = TemplateWithImages.bind({});
WithImages.args = {
  ...Primitive.args,
};
WithImages.storyName = 'WithImages';
WithImages.argTypes = {
  slidesPerView: {
    control: {
      disable: true,
    },
  },
};

export default createMeta({
  component: Carousel,
  title: 'Components/Carousels/Carousel',
  argTypes: {
    slides: {
      control: {
        disable: true,
      },
    },
  },
});
