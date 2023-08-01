import React from 'react';
import CardFooter from './CardFooter';
import Button from '../../Buttons/Button';
import { createMeta } from '../../../story-utils';

const Template = () => {
  return (
    <CardFooter>
      <Button label="Action button" variant="primary" />
    </CardFooter>
  );
};

export const Primitive = Template.bind({});

Primitive.args = {};

Primitive.storyName = 'CardFooter';

export default createMeta({
  component: CardFooter,
  title: 'Components/Cards/CardFooter',
});
