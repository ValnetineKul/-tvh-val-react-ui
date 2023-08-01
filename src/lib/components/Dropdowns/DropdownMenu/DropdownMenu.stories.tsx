import { action } from '@storybook/addon-actions';
import React from 'react';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import { AngleRight } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import MenuItem from '../../Menus/MenuItem';
import DropdownMenu from './DropdownMenu';

type Props = React.ComponentProps<typeof DropdownMenu>;

const Template = ((args: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <div ref={setAnchorEl} />
      <DropdownMenu {...args} anchor={anchorEl} onClose={() => {}} />
    </>
  );
}) as StoryTemplate<Props>;

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
    <MenuItem label="item_10" onClick={action('onItemClick')} />,
    <MenuItem label="item_11" onClick={action('onItemClick')} />,
    <MenuItem label="item_12" onClick={action('onItemClick')} />,
    <MenuItem label="item_13" onClick={action('onItemClick')} />,
    <MenuItem label="item_14" onClick={action('onItemClick')} />,
    <MenuItem label="item_15" onClick={action('onItemClick')} />,
  ],
  position: 'bottom-start',
  onClose: () => {},
  isLoading: false,
};

Primitive.storyName = 'Menu';

export const PrimitiveLoadingMenu = Template.bind({});
PrimitiveLoadingMenu.args = {
  mobileMenuTitle: 'Dropdown header',
  menuItems: [],
  position: 'bottom-start',
  onClose: () => {},
  isLoading: true,
};

PrimitiveLoadingMenu.storyName = 'LoadingMenu';

export default createMeta({
  component: DropdownMenu,
  title: 'Components/Dropdowns/Menu',
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
    anchor: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'HTMLElement, used to set the position of the Dropdown',
        },
      },
    },
  },
});
