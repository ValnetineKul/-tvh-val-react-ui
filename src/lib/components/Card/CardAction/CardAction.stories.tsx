import React from 'react';
import { action } from '@storybook/addon-actions';
import { Plus } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import CardAction from './CardAction';
import IconButton from '../../Buttons/IconButton';
import { createMeta } from '../../../story-utils';

const Template = () => {
  return (
    <CardAction>
      <IconButton icon={<Icon icon={Plus} />} onClick={action('onClick')} />
    </CardAction>
  );
};

export const Primitive = Template.bind({});

Primitive.args = {};

Primitive.storyName = 'CardAction';

export default createMeta({
  component: CardAction,
  title: 'Components/Cards/CardAction',
});
