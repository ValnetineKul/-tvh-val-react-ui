import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'react';
import React from 'react';
import { makeStyles } from '../../../themes/core';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import { AngleRight } from '../../components/Icon/icons/functional';
import Icon from '../../components/Icon';
import MenuItem from '../../components/Menus/MenuItem';
import OverflowAction from './OverflowAction';

type Args = ComponentProps<typeof OverflowAction> & {
  largePage?: boolean;
};

const useStyles = makeStyles()(() => ({
  largePage: { paddingTop: 400, paddingLeft: 400, paddingBottom: 400 },
}));

const Template = (({ largePage, ...props }: Args) => {
  const { classes, cx } = useStyles();
  return (
    <div className={cx(largePage && classes.largePage)}>
      <OverflowAction {...props} />
    </div>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  mobileMenuTitle: 'Dropdown header',
  menuItems: [
    <MenuItem label="very long menu item name which should be truncated" onClick={action('onItemClick')} />,
    <MenuItem label="item_2" onClick={action('onItemClick')} />,
    <MenuItem
      label="item_3"
      endIcon={<Icon icon={AngleRight} />}
      onClick={action('onItemClick')}
      subMenu={[
        <MenuItem label="sub_item_1" onClick={action('onItemClick')} />,
        <MenuItem label="sub_item_2" onClick={action('onItemClick')} />,
      ]}
    />,
    <MenuItem label="item_4" onClick={action('onItemClick')} />,
    <MenuItem label="item_5" onClick={action('onItemClick')} />,
    <MenuItem label="item_6" onClick={action('onItemClick')} />,
    <MenuItem label="item_7" onClick={action('onItemClick')} />,
    <MenuItem label="item_8" onClick={action('onItemClick')} />,
    <MenuItem label="item_9" onClick={action('onItemClick')} />,
  ],
  position: 'bottom-end',
  largePage: false,
};

Primitive.storyName = 'OverflowAction';

export default createMeta({
  component: OverflowAction,
  title: 'Patterns/OverflowActions/OverflowAction',
  argTypes: {
    menuItems: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'An array of MenuItem components',
        },
      },
    },
    largePage: {
      table: {
        type: {
          summary: 'Enlarge page area just for testing',
        },
      },
    },
  },
});
