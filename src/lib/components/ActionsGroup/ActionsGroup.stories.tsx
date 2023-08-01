import { action } from '@storybook/addon-actions';
import React from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Button from '../Buttons/Button';
import IconButton from '../Buttons/IconButton';
import ListIconButton from '../Buttons/ListIconButton';
import Icon from '../Icon';
import { Print } from '../Icon/icons/functional';
import MenuItem from '../Menus/MenuItem';
import ActionsGroup from './ActionsGroup';

const Template = createTemplate(ActionsGroup);

export const PrimitiveTwo = Template.bind({});
PrimitiveTwo.args = {
  buttons: [
    ({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />,
    ({ isFullWidth }) => <Button variant="tertiary" label="Print labels" fullWidth={isFullWidth} />,
  ],
  visibleAmount: 3,
};
PrimitiveTwo.storyName = 'ActionsGroup-two';

export const PrimitiveTwoWithIcon = Template.bind({});
PrimitiveTwoWithIcon.args = {
  buttons: [({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />],
  iconButtons: [() => <ListIconButton onClick={action('Add to list')} />],
};
PrimitiveTwoWithIcon.storyName = 'ActionsGroup-two-icon';

export const PrimitiveThree = Template.bind({});
PrimitiveThree.args = {
  buttons: [
    ({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />,
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Print labels" />
      ) : (
        <Button variant="tertiary" label="Print labels" fullWidth={isFullWidth} />
      ),
  ],
  iconButtons: [
    ({ isSquashed }) =>
      isSquashed ? <MenuItem label="Add to list" /> : <ListIconButton onClick={action('Add to list')} />,
  ],
  visibleAmount: 3,
};
PrimitiveThree.storyName = 'ActionsGroup-three';

export const PrimitiveFour = Template.bind({});
PrimitiveFour.args = {
  buttons: [
    ({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />,
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Print labels" />
      ) : (
        <Button variant="tertiary" label="Print labels" fullWidth={isFullWidth} />
      ),
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Recalculate" />
      ) : (
        <Button variant="tertiary" label="Recalculate" fullWidth={isFullWidth} />
      ),
  ],
  iconButtons: [
    ({ isSquashed }) =>
      isSquashed ? <MenuItem label="Add to list" /> : <ListIconButton onClick={action('Add to list')} />,
  ],
  visibleAmount: 3,
};
PrimitiveFour.storyName = 'ActionsGroup-four';

export const PrimitiveFive = Template.bind({});
PrimitiveFive.args = {
  buttons: [
    ({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />,
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Print labels" />
      ) : (
        <Button variant="tertiary" label="Print labels" fullWidth={isFullWidth} />
      ),
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Recalculate" />
      ) : (
        <Button variant="tertiary" label="Recalculate" fullWidth={isFullWidth} />
      ),
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? <MenuItem label="Remove" /> : <Button variant="tertiary" label="Remove" fullWidth={isFullWidth} />,
  ],
  iconButtons: [
    ({ isSquashed }) =>
      isSquashed ? <MenuItem label="Add to list" /> : <ListIconButton onClick={action('Add to list')} />,
  ],
  visibleAmount: 3,
};
PrimitiveFive.storyName = 'ActionsGroup-five';

export const PrimitiveMore = Template.bind({});
PrimitiveMore.args = {
  buttons: [
    ({ isFullWidth }) => <Button variant="primary" label="Add to basket" fullWidth={isFullWidth} />,
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Print labels" />
      ) : (
        <Button variant="tertiary" label="Print labels" fullWidth={isFullWidth} />
      ),
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <MenuItem label="Recalculate" />
      ) : (
        <Button variant="tertiary" label="Recalculate" fullWidth={isFullWidth} />
      ),
    ({ isFullWidth, isSquashed }) =>
      isSquashed ? <MenuItem label="Remove" /> : <Button variant="tertiary" label="Remove" fullWidth={isFullWidth} />,
  ],
  iconButtons: [
    ({ isSquashed }) =>
      isSquashed ? <MenuItem label="Add to list" /> : <ListIconButton onClick={action('Add to list')} />,
    ({ isSquashed }) =>
      isSquashed ? <MenuItem label="Print" /> : <IconButton onClick={action('Print')} icon={<Icon icon={Print} />} />,
  ],
  visibleAmount: 3,
};
PrimitiveMore.storyName = 'ActionsGroup-six';

export default createMeta({
  title: 'Components/ActionsGroups/ActionsGroup',
  component: ActionsGroup,
});
