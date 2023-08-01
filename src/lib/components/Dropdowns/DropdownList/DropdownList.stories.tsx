import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import Banner from '../../Banner';
import Button from '../../Buttons/Button';
import SplitButton from '../../Buttons/SplitButton';
import MenuItem from '../../Menus/MenuItem';
import Typography from '../../Typography';
import DropdownAction from '../DropdownAction';
import DropdownList from './DropdownList';

type Props = React.ComponentProps<typeof DropdownList>;

const Template = ((args: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isChecked, setIsChecked] = useState(args.checked);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onClose = () => {
    setAnchorEl(null);
    setSearchValue('');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? onClose() : setAnchorEl(event.currentTarget);
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <SplitButton onDropdownClick={handleClick} label="Test button" />
      {anchorEl && (
        <DropdownList
          {...args}
          checked={isChecked}
          listItems={args.listItems.filter(({ props }) =>
            props.label.toLowerCase().includes(searchValue.toLowerCase())
          )}
          anchor={anchorEl}
          onClose={onClose}
          onSearch={onSearch}
          onCheckboxChange={handleChange}
        />
      )}
    </>
  );
}) as StoryTemplate<Props>;

const TemplateEmpty = ((args: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? onClose() : setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <SplitButton onDropdownClick={handleClick} label="Test button" />
      {anchorEl && <DropdownList {...args} anchor={anchorEl} onClose={onClose} />}
    </>
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  checkboxLabel: 'Option',
  header: 'Dropdown header',
  inlineMessage: 'No results',
  listItems: new Array(15).fill(null).map((_, idx) => {
    return <MenuItem label={`item_${idx + 1}`} subLabel="testSubLabel" onClick={action('onItemClick')} />;
  }),
  actionItem: <DropdownAction label="label" onClick={action('onActionClick')} />,
  position: 'bottom-end',
  onClose: () => {},
  isLoading: false,
};

Primitive.storyName = 'list';

export const ListWithoutSearchAndCheckbox = TemplateEmpty.bind({});
ListWithoutSearchAndCheckbox.args = {
  header: 'Dropdown header',
  listItems: new Array(15).fill(null).map((_, idx) => {
    return <MenuItem label={`item_${idx + 1}`} onClick={action('onItemClick')} />;
  }),
  position: 'bottom-end',
  onClose: () => {},
  isLoading: false,
};

ListWithoutSearchAndCheckbox.storyName = 'listWithoutSearchAndCheckbox';

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  ...Primitive.args,
  header: (
    <div
      style={{ display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'center', marginRight: 'auto' }}
    >
      <Typography variant="h4">Custom Header</Typography>
      <Button label="Button" />
    </div>
  ),
};

CustomHeader.storyName = 'customHeader';

export const TruncatedItem = Template.bind({});
TruncatedItem.args = {
  ...Primitive.args,
  listItems: [
    <MenuItem label="very long menu item name which should be truncated" onClick={action('onItemClick')} />,
    ...Primitive.args.listItems,
  ],
};

TruncatedItem.storyName = 'truncatedItem';

export const EmptyList = TemplateEmpty.bind({});
EmptyList.args = {
  header: 'Dropdown header',
  listItems: [],
  inlineMessage: 'No lists defined,\nplease create a new list.',
  actionItem: <DropdownAction label="label" onClick={action('onActionClick')} />,
  position: 'bottom-end',
  onClose: () => {},
  isLoading: false,
};

EmptyList.storyName = 'emptyList';

export const Error = TemplateEmpty.bind({});
Error.args = {
  header: 'Dropdown header',
  listItems: [],
  error: (
    <Banner
      status="error"
      message="Could not load list. Please refresh."
      button={<Button label="Refresh" onClick={action('onErrorClick')} variant="tertiary" />}
    />
  ),
  actionItem: <DropdownAction label="label" onClick={action('onActionClick')} />,
  position: 'bottom-end',
  onClose: () => {},
  isLoading: false,
};

Error.storyName = 'error';

export default createMeta({
  component: DropdownList,
  title: 'Components/Dropdowns/List',
  argTypes: {
    listItems: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'An array of MenuItem components',
        },
      },
    },
    error: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'A component with error message and button',
        },
      },
    },
    header: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'A string or a component',
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
    actionItem: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'A component with icon button and label',
        },
      },
    },
    searchField: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'Search field component',
        },
      },
    },
  },
});
