import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { createMeta } from '../../../story-utils';
import { FileDownload, Pen, Trash } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import InlineMessage from '../../InlineMessage';
import Tag from '../../Tags/Tag';
import MenuItem from '../MenuItem';
import MenuList from './MenuList';

type Props = ComponentProps<typeof MenuList>;

export const Primitive = (args: Props) => {
  const [selectedState, setSelectedState] = useState('item2');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    <MenuList {...args}>
      <MenuItem
        label="Edit"
        startIcon={<Icon icon={Pen} />}
        selected={selectedState === 'item1'}
        onClick={() => handleClick('item1')}
      />
      <MenuItem
        label="Download"
        startIcon={<Icon icon={FileDownload} />}
        selected={selectedState === 'item2'}
        onClick={() => handleClick('item2')}
      />
      <MenuItem
        label="Delete"
        startIcon={<Icon icon={Trash} />}
        selected={selectedState === 'item3'}
        onClick={() => handleClick('item3')}
      />
    </MenuList>
  );
};
Primitive.storyName = 'startIcon';

export const Tags = (args: Props) => {
  const [selectedState, setSelectedState] = useState('item2');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    <MenuList {...args}>
      <MenuItem
        label="item 1"
        tag={<Tag label="123" />}
        selected={selectedState === 'item1'}
        onClick={() => handleClick('item1')}
      />
      <MenuItem
        label="item 2"
        tag={<Tag label="123" />}
        selected={selectedState === 'item2'}
        onClick={() => handleClick('item2')}
      />
      <MenuItem
        label="item 3"
        tag={<Tag label="123" />}
        selected={selectedState === 'item3'}
        onClick={() => handleClick('item3')}
      />
    </MenuList>
  );
};
Tags.storyName = 'tag';

export const Checkboxes = (args: Props) => {
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>({
    opt1: false,
    opt2: true,
    opt3: false,
  });
  const handleCheckboxChange = (checkbox: string) => {
    setSelectedStates({
      ...selectedStates,
      [checkbox]: !selectedStates[checkbox],
    });
  };

  return (
    <MenuList {...args}>
      <MenuItem
        label="option 1"
        checkbox
        selected={selectedStates.opt1}
        onCheckboxChange={() => handleCheckboxChange('opt1')}
      />
      <MenuItem
        label="option 2"
        checkbox
        selected={selectedStates.opt2}
        onCheckboxChange={() => handleCheckboxChange('opt2')}
      />
      <MenuItem
        label="option 3"
        checkbox
        selected={selectedStates.opt3}
        onCheckboxChange={() => handleCheckboxChange('opt3')}
      />
    </MenuList>
  );
};
Checkboxes.storyName = 'checkbox';

export const InlineMessages = (args: Props) => {
  const [selectedState, setSelectedState] = useState('item2');
  const handleClick = (item: string) => {
    selectedState !== item && setSelectedState(item);
  };

  return (
    <MenuList {...args}>
      <MenuItem
        label="item 1"
        inlineMessage={<InlineMessage message="Success message" status="success" />}
        selected={selectedState === 'item1'}
        onClick={() => handleClick('item1')}
      />
      <MenuItem
        label="item 2"
        inlineMessage={<InlineMessage message="Warning message" status="warning" />}
        selected={selectedState === 'item2'}
        onClick={() => handleClick('item2')}
      />
      <MenuItem
        label="item 3"
        inlineMessage={<InlineMessage message="Error message" status="error" />}
        selected={selectedState === 'item3'}
        onClick={() => handleClick('item3')}
      />
    </MenuList>
  );
};
InlineMessages.storyName = 'inlineMessage';

export default createMeta({
  component: MenuList,
  title: 'Components/Menus/MenuList',
});
