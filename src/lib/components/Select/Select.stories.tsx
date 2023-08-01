import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../themes/core';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import Icon from '../Icon';
import { UserCircle } from '../Icon/icons/functional';
import CountrySelect from '../CountrySelect';
import type { CountryItem } from '../CountrySelect';
import Banner from '../Banner';
import Button from '../Buttons/Button';
import MenuItem from '../Menus/MenuItem';
import { surface } from './Select.constants';
import Select from './Select';

const useStyles = makeStyles<void, 'menuItem'>()((theme, _, classes) => ({
  item: {
    padding: theme.layoutSpacing['spacing/000'],
    width: '100%',
    [`&.Mui-focusVisible .${classes.menuItem}`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
  },
  itemWithAutoHighlight: {
    [`&.Mui-focused .${classes.menuItem}`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
  },
  menuItem: {},
}));

type Props = React.ComponentProps<typeof Select>;
type Args = Omit<Props, 'getOptionLabel' | 'onChange' | 'options' | 'freeSolo' | 'freeSoloCreatable'>;
type Option = { label: string; value: string; inputVal?: string };
interface MultiParamOption extends Option {
  subLabel: string;
}

const options: Option[] = [
  {
    label: 'Very long menu item name which should be truncated',
    value: 'option_0',
  },
  {
    label: 'Container handling equipment',
    value: 'option_1',
  },
  {
    label: 'Electric forklifts',
    value: 'option_2',
  },
  {
    label: 'Forklifts',
    value: 'option_3',
  },
  {
    label: 'High-Capacity Forklifts',
    value: 'option_4',
  },
  {
    label: 'Truck-mounted forklifts',
    value: 'option_5',
  },
  {
    label: 'IC Forklifts',
    value: 'option_6',
  },
  {
    label: 'Telehandlers',
    value: 'option_7',
  },
  {
    label: 'Handling equipment',
    value: 'option_8',
  },
  {
    label: 'Icteco',
    value: 'option_9',
  },
  {
    label: 'Engine Parts TVH',
    value: 'option_10',
  },
  {
    label: 'TVH',
    value: 'option_11',
  },
  {
    label: 'Karcher',
    value: 'option_12',
  },
  {
    label: 'Vilectra',
    value: 'option_13',
  },
  {
    label: 'Minuteman',
    value: 'option_14',
  },
  {
    label: 'Nystrom',
    value: 'option_15',
  },
];

const groupedOptions: Record<string, Option[]> = {
  Location: [
    { label: 'Location 1', value: 'option_1' },
    { label: 'Location 2', value: 'option_2' },
    { label: 'Price location', value: 'option_3' },
  ],
  Price: [
    { label: 'Manual price', value: 'option_4' },
    { label: 'Calculated price', value: 'option_5' },
  ],
};

const multiParamOptions = [
  { label: 'Armenia', subLabel: 'Yerevan', value: 'value_1' },
  { label: 'Belgium', subLabel: 'Brussels', value: 'value_2' },
  { label: 'Belarus', subLabel: 'Minsk', value: 'value_3' },
  { label: 'Bulgaria', subLabel: 'Sofia', value: 'value_4' },
  { label: 'Cyprus', subLabel: 'Nicosia', value: 'value_5' },
  { label: 'Georgia', subLabel: 'Tbilisi', value: 'value_6' },
  { label: 'Kazakhstan', subLabel: 'Astana', value: 'value_7' },
  { label: 'Kyrgyzstan', subLabel: 'Bishkek', value: 'value_8' },
  { label: 'Lithuania', subLabel: 'Vilnius', value: 'value_9' },
  { label: 'Poland', subLabel: 'Warsaw', value: 'value_10' },
  { label: 'Romania', subLabel: 'Bucharest', value: 'value_11' },
  { label: 'Serbia', subLabel: 'Belgrade', value: 'value_12' },
];

const Template = ((args: Args) => {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <Select<Option, false>
      id="select-id"
      {...args}
      options={options}
      getOptionLabel={(option) => option.label}
      multiple={false}
      value={value}
      onChange={(e, v) => {
        setValue(v);
        action('onChange (option)')(v);
      }}
    />
  );
}) as StoryTemplate<Args>;

const GroupedSingleTemplate = ((args: Args) => {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <Select<Option, false>
      id="select-id"
      {...args}
      options={groupedOptions}
      getOptionLabel={(option) => option.label}
      multiple={false}
      value={value}
      onChange={(e, v) => {
        setValue(v);
        action('onChange (option)')(v);
      }}
    />
  );
}) as StoryTemplate<Args>;

const TemplateFreeSolo = ((args: Args) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select<string, false, true>
      id="select-id"
      {...args}
      freeSolo
      options={options.map((option) => option.label)}
      // If you use freeSolo it is necessary to converting options to strings
      // AND update your getOptionLabel function so it does not return undefined
      // when it's called with a string (please see an example in the next line)
      getOptionLabel={(option) => option}
      multiple={false}
      value={value}
      onChange={(e, v) => {
        setValue(v);
        action('onChange (option)')(v);
      }}
    />
  );
}) as StoryTemplate<Args>;

const TemplateFreeSoloCreatable = ((args: Args) => {
  const [value, setValue] = useState<Option | null>(null);

  return (
    <Select<Option, false, boolean, true>
      id="select-id"
      {...args}
      multiple={false}
      options={options}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            label: newValue,
            value: newValue,
          });
        } else if (newValue && newValue.inputVal) {
          setValue({
            label: newValue.inputVal,
            value: newValue.inputVal,
          });
        } else {
          setValue(newValue);
        }
        action('onChange (option)')(newValue);
      }}
      getOptionLabel={(option) => {
        // Value selected with onEnter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Regular option
        return option.label;
      }}
      freeSoloCreatable
    />
  );
}) as StoryTemplate<Args>;

const MultipleTemplate = ((args: Args) => {
  const [value, setValue] = useState<Option[]>([options[0]]);

  return (
    <Select<Option, true, false>
      id="select-id"
      {...args}
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      multiple
      onChange={(e, v) => {
        setValue(v);
        action('onChange (option)')(v);
      }}
    />
  );
}) as StoryTemplate<Args>;

const MultipleSelectAllTemplate = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<Option[]>([options[1]]);

  const handleClearOptions = () => setValue([]);

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setValue(options);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleOption = (selectedOptions: Option[]) => setValue(selectedOptions);

  return (
    <Select<Option, true, boolean, boolean>
      id="select-id"
      {...args}
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      multiple
      onSelectAll={handleSelectAll}
      onToggleOption={handleToggleOption}
    />
  );
};

const GroupedMultipleSelectAllTemplate = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<Option[]>([groupedOptions['Location'][1]]);

  const handleClearOptions = () => setValue([]);

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setValue(Object.keys(groupedOptions).reduce((sum, key) => [...sum, ...groupedOptions[key]], []));
    } else {
      handleClearOptions();
    }
  };

  const handleToggleOption = (selectedOptions: Option[]) => setValue(selectedOptions);

  return (
    <Select<Option, true, boolean, boolean>
      id="select-id"
      {...args}
      options={groupedOptions}
      getOptionLabel={(option) => option.label}
      value={value}
      multiple
      onSelectAll={handleSelectAll}
      onToggleOption={handleToggleOption}
    />
  );
};

const ErrorTemplate = ((args: Args) => {
  const [value, setValue] = useState<CountryItem | null>(null);

  return (
    <CountrySelect
      id="select-id"
      {...args}
      options={[]}
      onChange={(_, v) => setValue(v as CountryItem)}
      value={value}
      NoOptionsText={
        <Banner
          status="error"
          message="Could not load list. Please refresh."
          button={<Button label="Refresh" onClick={action('onRefreshClick')} variant="tertiary" />}
          direction="vertical"
        />
      }
    />
  );
}) as StoryTemplate<Args>;

const MultiParamSearchTemplate = ((args: Args) => {
  const { classes, cx } = useStyles();
  const [value, setValue] = useState<MultiParamOption | null>(null);

  return (
    <Select<MultiParamOption, false>
      id="select-id"
      {...args}
      options={multiParamOptions}
      getOptionLabel={(option) => option.label}
      multiple={false}
      value={value}
      renderOption={(optionProps, { label, subLabel }, { selected }) => {
        const key = optionProps.id as string;
        return (
          <li
            {...optionProps}
            key={key}
            className={cx(classes.item, {
              [classes.itemWithAutoHighlight]: args.autoHighlight || args.autoHighlightWhenFilled,
            })}
          >
            <MenuItem
              label={label}
              subLabel={subLabel}
              selected={selected}
              elementType="div"
              focusVisibleClassName={classes.menuItem}
            />
          </li>
        );
      }}
      onChange={(_, v) => {
        setValue(v);
        action('onChange (option)')(v);
      }}
    />
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  placeholder: 'Select a value',
  disabled: false,
  fullWidth: false,
  required: false,
  autoHighlight: false,
  isVirtualized: true,
  autoSelect: false,
};
Primitive.storyName = 'Single';

export const FreeSelect = TemplateFreeSolo.bind({});
FreeSelect.args = {
  ...Primitive.args,
  placeholder: 'Add a value',
};
FreeSelect.storyName = 'FreeSelect';
FreeSelect.argTypes = {
  freeSolo: {
    control: {
      disable: false,
    },
  },
  isFreeSoloSearchInput: {
    control: {
      disable: false,
    },
  },
};

export const FreeSelectCreatable = TemplateFreeSoloCreatable.bind({});
FreeSelectCreatable.args = {
  ...Primitive.args,
  placeholder: 'Add a value',
};
FreeSelectCreatable.storyName = 'FreeSelectCreatable';
FreeSelectCreatable.argTypes = {
  freeSoloCreatable: {
    control: {
      disable: false,
    },
  },
};

export const GroupedSingle = GroupedSingleTemplate.bind({});
GroupedSingle.args = {
  ...Primitive.args,
};
GroupedSingle.storyName = 'GroupedSingle';

export const SingleStartIcon = Template.bind({});
SingleStartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={UserCircle} />,
};
SingleStartIcon.storyName = 'Single startIcon';

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  ...Primitive.args,
  modalActionItemLabel: 'Done',
};
Multiple.argTypes = {
  modalActionItemLabel: {
    table: {
      disable: false,
    },
  },
  freeSolo: {
    table: {
      disable: true,
    },
  },
};

export const MultipleStartIcon = MultipleTemplate.bind({});
MultipleStartIcon.args = {
  ...Primitive.args,
  modalActionItemLabel: 'Done',
  startIcon: <Icon icon={UserCircle} />,
};
MultipleStartIcon.storyName = 'MultipleStartIcon';
MultipleStartIcon.argTypes = {
  modalActionItemLabel: {
    table: {
      disable: false,
    },
  },
  freeSolo: {
    table: {
      disable: true,
    },
  },
};

export const MultipleSelectAll = MultipleSelectAllTemplate.bind({});
MultipleSelectAll.args = {
  ...Primitive.args,
  modalActionItemLabel: 'Done',
  selectAllLabel: 'Select All',
};
MultipleSelectAll.storyName = 'MultipleSelectAll';
MultipleSelectAll.argTypes = {
  selectAllLabel: {
    control: {
      disable: false,
    },
  },
  modalActionItemLabel: {
    table: {
      disable: false,
    },
  },
  freeSolo: {
    table: {
      disable: true,
    },
  },
};

export const GroupedMultipleSelectAll = GroupedMultipleSelectAllTemplate.bind({});
GroupedMultipleSelectAll.args = {
  ...Primitive.args,
  modalActionItemLabel: 'Done',
  selectAllLabel: 'Select All',
};
GroupedMultipleSelectAll.storyName = 'GroupedMultipleSelectAll';
GroupedMultipleSelectAll.argTypes = {
  selectAllLabel: {
    control: {
      disable: false,
    },
  },
  modalActionItemLabel: {
    table: {
      disable: false,
    },
  },
  freeSolo: {
    table: {
      disable: true,
    },
  },
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  ...Primitive.args,
};

export const MultiParamSearch = MultiParamSearchTemplate.bind({});
MultiParamSearch.args = {
  ...Primitive.args,
  findByAllParams: ['label', 'subLabel'],
};
MultiParamSearch.storyName = 'MultiParamSearch';

export default createMeta({
  component: Select,
  title: 'Components/Selects/Select',
  argTypes: {
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    inputRef: {
      table: {
        disable: true,
      },
    },
    value: {
      control: {
        disable: true,
      },
    },
    startIcon: {
      control: {
        disable: true,
      },
    },
    options: {
      control: {
        disable: true,
      },
    },
    selectAllLabel: {
      control: {
        disable: true,
      },
    },
    multiple: {
      control: {
        disable: true,
      },
    },
    id: {
      control: {
        disable: true,
      },
    },
    freeSolo: {
      control: {
        disable: true,
      },
    },
    freeSoloCreatable: {
      control: {
        disable: true,
      },
    },
    modalActionItemLabel: {
      table: {
        disable: true,
      },
    },
    isFreeSoloSearchInput: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail:
            'Autocomplete TextField has type="search" if isFreeSoloSearchInput is true. The default TextField type is "text".',
        },
      },
    },
  },
});
