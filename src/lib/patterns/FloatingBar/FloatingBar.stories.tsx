import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'react';
import React from 'react';
import MenuItem from '../../components/Menus/MenuItem';
import { Print, Trash } from '../../components/Icon/icons/functional';
import ActionsGroup from '../../components/ActionsGroup';
import Button from '../../components/Buttons/Button';
import IconButton from '../../components/Buttons/IconButton';
import SplitButton from '../../components/Buttons/SplitButton';
import Icon from '../../components/Icon';
import Typography from '../../components/Typography';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import FloatingBar from './FloatingBar';

type Props = ComponentProps<typeof FloatingBar>;

const Template = ((args: Props) => (
  <>
    <p>FloatingBar appears on the bottom of the screen</p>
    <FloatingBar {...args} onClearSelection={action('clear selection')} />
  </>
)) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: (
    <span>
      <Typography variant="body500" weight="emphasis" component="b">
        1
      </Typography>{' '}
      <Typography variant="body500" component="span">
        item selected
      </Typography>
    </span>
  ),
  actions: (
    <ActionsGroup
      buttons={[
        ({ isFullWidth }) => (
          <SplitButton
            onClick={action('onAddToBasketClick')}
            onDropdownClick={action('onDropdownClick')}
            label="Add to basket"
            fullWidth={isFullWidth}
          />
        ),
        ({ isFullWidth }) => (
          <Button
            label="Change warehouse"
            onClick={action('onChangeWarehouseClick')}
            variant="secondary"
            fullWidth={isFullWidth}
          />
        ),
        ({ isFullWidth, isSquashed }) =>
          isSquashed ? (
            <MenuItem label="Remove" startIcon={<Icon icon={Trash} />} onClick={action('onRemoveClick')} />
          ) : (
            <Button
              label="Remove"
              variant="tertiary"
              startIcon={<Icon icon={Trash} />}
              onClick={action('onRemoveClick')}
              fullWidth={isFullWidth}
            />
          ),
      ]}
      iconButtons={[
        ({ isSquashed }) =>
          isSquashed ? (
            <MenuItem label="Print" startIcon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
          ) : (
            <IconButton icon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
          ),
      ]}
    />
  ),
};
Primitive.storyName = 'FloatingBar';

export default createMeta({
  component: FloatingBar,
  title: 'Patterns/FloatingBars/FloatingBar',
  argTypes: {
    label: {
      control: {
        disable: true,
      },
    },
    actions: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: '<ActionsGroup> or custom component if needed' },
      },
    },
    onClearSelection: {
      control: {
        disable: true,
      },
    },
  },
});
