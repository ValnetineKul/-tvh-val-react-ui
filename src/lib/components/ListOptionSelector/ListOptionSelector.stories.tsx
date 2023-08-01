import { action } from '@storybook/addon-actions';
import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { makeStyles } from '../../../themes/core';
import type { StoryTemplate } from '../../story-utils';
import Divider from '../Divider';
import ListOptionSelector from './ListOptionSelector';
import { createMeta } from '../../story-utils';

type Props = ComponentProps<typeof ListOptionSelector>;

const useStyles = makeStyles()(() => ({
  divider: {
    marginLeft: '16px',
    marginRight: '16px',
  },
}));

type TemplateArgs = Omit<Props, 'value' | 'onChange'>;
const Template = ((args: TemplateArgs) => {
  const [value, setValue] = useState(args.options[0].value);

  const handleChange = (v: string) => {
    setValue(v);
    action('onChange')(v);
  };

  return <ListOptionSelector {...args} value={value} onChange={(v: string) => handleChange(v)} />;
}) as StoryTemplate<TemplateArgs>;

type MultiSelectTemplateArgs = TemplateArgs;
const MultiSelectTemplate = ((args: React.ComponentProps<typeof ListOptionSelector>) => {
  const [filterValues, setFilterValues] = useState(['private']);

  const handleFilterChange = (value: string) => {
    if (filterValues.includes(value)) {
      return setFilterValues(filterValues.filter((o) => o !== value));
    }
    setFilterValues(filterValues.concat(value));
  };

  return <ListOptionSelector {...args} value={filterValues} onChange={handleFilterChange} />;
}) as StoryTemplate<MultiSelectTemplateArgs>;

type MultiSelectAllTemplateArgs = TemplateArgs;
const MultiSelectAllTemplate = ((args: React.ComponentProps<typeof ListOptionSelector>) => {
  const [filterValues, setFilterValues] = useState(['private']);

  const handleFilterChange = (value: string) => {
    if (filterValues.includes(value)) {
      return setFilterValues(filterValues.filter((o) => o !== value));
    }
    setFilterValues(filterValues.concat(value));
  };

  const handleSelectAll = (isAllSelected: boolean, allValues: string[]) => {
    if (isAllSelected) {
      setFilterValues(allValues);
    } else {
      setFilterValues([]);
    }
    action('onSelectAll')(isAllSelected);
  };

  return (
    <ListOptionSelector {...args} value={filterValues} onChange={handleFilterChange} onSelectAll={handleSelectAll} />
  );
}) as StoryTemplate<MultiSelectAllTemplateArgs>;

const MultiSelectCustomLabelTemplate = ((args: React.ComponentProps<typeof ListOptionSelector>) => {
  const [filterValues, setFilterValues] = useState(['private']);

  const handleFilterChange = (value: string) => {
    if (filterValues.includes(value)) {
      return setFilterValues(filterValues.filter((o) => o !== value));
    }
    setFilterValues(filterValues.concat(value));
  };

  const handleSelectAll = (isAllSelected: boolean, allValues: string[]) => {
    if (isAllSelected) {
      setFilterValues(allValues);
    } else {
      setFilterValues([]);
    }
    action(`onSelectAll`)(isAllSelected);
  };

  const overrideMultiSelectLabel = () => {
    if (filterValues.length === args.options.length) {
      return 'No levels excluded';
    }
    if (filterValues.length === 0) {
      return 'All excluded';
    }
    if (filterValues.length === 1) {
      return args.options.find((el) => el.value === filterValues[0])?.label || '';
    }
    return `${args.options.length - filterValues.length} excluded`;
  };

  return (
    <ListOptionSelector
      {...args}
      value={filterValues}
      options={[
        { label: 'Private', value: 'private' },
        { label: 'Shared by me', value: 'shared_by_me' },
        { label: 'Shared with me', value: 'shared_with_me' },
      ]}
      onChange={handleFilterChange}
      onSelectAll={handleSelectAll}
      overrideMultiSelectLabel={overrideMultiSelectLabel}
    />
  );
}) as StoryTemplate<MultiSelectAllTemplateArgs>;

type MultipleOptionSelectorTemplateArgs = Omit<Props, 'value' | 'onChange' | 'label' | 'options'>;
const MultipleOptionSelectorTemplate = ((args: MultipleOptionSelectorTemplateArgs) => {
  const { classes } = useStyles();

  const [currentSortValue, setCurrentSortValue] = useState('name');
  const [currentFilterValue, setCurrentFilterValue] = useState('all_lists');
  const [currentPageSizeValue, setCurrentPageSizeValue] = useState<string | number>(10);

  const handleSortValueChange = (v: string) => {
    setCurrentSortValue(v);
    action('onChange (sort)')(v);
  };

  const handleFilterValueChange = (v: string) => {
    setCurrentFilterValue(v);
    action('onChange (filter)')(v);
  };

  const handlePageSizeValueChange = (v: string | number) => {
    setCurrentPageSizeValue(v);
    action('onChange (items per page)')(v);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <ListOptionSelector
        {...args}
        label="Sort by:"
        value={currentSortValue}
        options={[
          { label: 'Name', value: 'name' },
          { label: 'Description', value: 'description' },
          { label: 'Date modified', value: 'date_modified' },
          { label: 'Date created', value: 'date_created' },
        ]}
        onChange={(v: string) => handleSortValueChange(v)}
      />

      <Divider direction="vertical" className={classes.divider} />

      <ListOptionSelector
        {...args}
        label="Filter by:"
        value={currentFilterValue}
        options={[
          { label: 'All lists', value: 'all_lists' },
          { label: 'Created by me', value: 'created_by_me' },
          { label: 'Shared with me', value: 'shared_with_me' },
        ]}
        onChange={(v: string) => handleFilterValueChange(v)}
      />

      <Divider direction="vertical" className={classes.divider} />

      <ListOptionSelector
        {...args}
        label="Items per page:"
        value={currentPageSizeValue}
        options={[{ value: 10 }, { value: 30 }, { value: 50 }, { label: 'View all', value: 'viewAll' }]}
        onChange={(v: string | number) => handlePageSizeValueChange(v)}
      />
    </div>
  );
}) as StoryTemplate<MultipleOptionSelectorTemplateArgs>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Sort by:',
  options: [
    { label: 'Date modified (newest)', value: 'date_modified,asc' },
    { label: 'Date modified (oldest)', value: 'date_modified,desc' },
    { label: 'Creation date (newest)', value: 'date_created,asc' },
    { label: 'Creation date (oldest)', value: 'date_created,desc' },
  ],
  disabled: false,
};

Primitive.storyName = 'ListOptionSelector';

export const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.args = {
  label: 'Filter on:',
  options: [
    { label: 'Private', value: 'private' },
    { label: 'Shared by me', value: 'shared_by_me', disabled: true },
    { label: 'Shared with me', value: 'shared_with_me' },
  ],
  disabled: false,
  multiple: true,
};

MultiSelect.storyName = 'ListOptionMultiSelector';

export const MultiSelectAll = MultiSelectAllTemplate.bind({});
MultiSelectAll.args = {
  ...MultiSelect.args,
};

MultiSelectAll.storyName = 'ListOptionMultiSelectorAll';

export const MultiSelectCustomLabel = MultiSelectCustomLabelTemplate.bind({});
MultiSelectCustomLabel.args = {
  ...MultiSelect.args,
};

MultiSelectCustomLabel.storyName = 'ListOptionMultiSelectorCustomLabel';

export const MultipleOptionSelector = MultipleOptionSelectorTemplate.bind({});
MultipleOptionSelector.args = {};
MultipleOptionSelector.storyName = 'MultipleOptionSelector';

MultipleOptionSelector.argTypes = {
  label: {
    control: {
      disable: true,
    },
  },
  disabled: {
    control: {
      disable: true,
    },
  },
};

export default createMeta({
  component: ListOptionSelector,
  title: 'Components/ListOptions/ListOptionSelector',
  argTypes: {
    label: {
      table: {
        type: {
          summary: 'Label for ListOptionSelector ("Sort by:", "Filter by:", "Items per page:", etc.)',
        },
      },
    },
    value: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'Value of selected option',
        },
      },
    },
    options: {
      control: {
        disable: true,
      },
      table: {
        type: {
          summary: 'Options: { value: 10 } or { label: "View all", value: "viewAll" } or { value: "value" }.',
        },
      },
    },
    multiple: {
      control: {
        disable: true,
      },
    },
  },
});
