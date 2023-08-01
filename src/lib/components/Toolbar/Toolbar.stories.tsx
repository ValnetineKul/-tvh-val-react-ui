import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import SearchField from '../SearchField';
import Select from '../Select';
import Toolbar from './Toolbar';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import Icon from '../Icon';
import { List, Grid, Bars } from '../Icon/icons/functional';

const options = [
  {
    label: 'Option 1',
    value: 'option_1',
  },
  {
    label: 'Option 2',
    value: 'option_2',
  },
];

const segmentsWithIcons = [
  {
    label: 'Listview',
    value: 'listview',
    icon: <Icon icon={List} />,
  },
  {
    label: 'Gridview',
    value: 'gridview',
    icon: <Icon icon={Grid} />,
  },
  {
    label: 'Tableview',
    value: 'tableview',
    icon: <Icon icon={Bars} />,
    disabled: true,
  },
];

type Props = ComponentProps<typeof Toolbar>;
type Args = Omit<Props, 'searchValue' | 'onSearch' | 'listOptions'>;

const Template = ((args: Args) => {
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState<{ label: string; value: string } | null>(null);

  const [currentSortValue, setCurrentSortValue] = useState('date_modified,asc');
  const [currentFilterValue, setCurrentFilterValue] = useState(['created_by_me']);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSortValueChange = (v: string) => {
    setCurrentSortValue(v);
    action('onChange (sort)')(v);
  };

  const handleFilterValueChange = (v: string) => {
    if (currentFilterValue.includes(v)) {
      return setCurrentFilterValue(currentFilterValue.filter((o) => o !== v));
    }
    setCurrentFilterValue(currentFilterValue.concat(v));
    action('onChange (filter)')(v);
  };

  const handleSelectAll = (isAllSelected: boolean, allValues: string[]) => {
    if (isAllSelected) {
      setCurrentFilterValue(allValues);
    } else {
      setCurrentFilterValue([]);
    }
  };

  const onSearchValueChange = (v: string) => {
    setSearchValue(v);
    action('onChange (search)')(v);
  };

  const handleSegmentedControlChange = (v: string, id: number) => {
    action('onChange (SegmentedControlChange)')(v, id);
  };

  const handleSwitchChange = (v: boolean) => {
    setIsSwitchChecked(v);
    action('onChange (SwitchChange)')(v);
  };

  return (
    <Toolbar
      {...args}
      component={
        <>
          <Select
            label="Label"
            placeholder="Select a value"
            options={options}
            getOptionLabel={(option) => option.label}
            multiple={false}
            value={value}
            onChange={(e, v) => setValue(v)}
          />
          <SearchField
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
            placeholder="Search on"
            variant="secondary"
          />
        </>
      }
      listOptions={[
        {
          label: 'Sort by:',
          value: currentSortValue,
          options: [
            { label: 'Date modified (newest)', value: 'date_modified,asc' },
            { label: 'Date modified (oldest)', value: 'date_modified,desc' },
            { label: 'Creation date (newest)', value: 'date_created,asc' },
            { label: 'Creation date (oldest)', value: 'date_created,desc' },
          ],
          disabled: true,
          onChange: (v: string) => handleSortValueChange(v),
          multiple: false,
        },
        {
          label: 'Filter by:',
          value: currentFilterValue,
          options: [
            { label: 'Created by me', value: 'created_by_me' },
            { label: 'Shared with me', value: 'shared_with_me' },
          ],
          onChange: handleFilterValueChange,
          onSelectAll: handleSelectAll,
          selectAllLabel: 'All lists',
          multiple: true,
        },
      ]}
      switches={[
        {
          label: 'Only my offers',
          checked: isSwitchChecked,
          onChange: (_, checked) => handleSwitchChange(checked),
        },
        {
          label: 'Enabled',
          checked: false,
          disabled: true,
        },
      ]}
      segmentedControl={{
        name: '',
        segmentList: segmentsWithIcons,
        onSegmentChange: handleSegmentedControlChange,
      }}
    />
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {};
Primitive.storyName = 'Toolbar';

export default createMeta({
  component: Toolbar,
  title: 'Components/ListOptions/Toolbar',
  argTypes: {
    listOptions: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Array of list options, that should have the following properties: label, value, options, onChange',
        },
      },
    },
  },
});
