import type { ChangeEvent, ComponentProps, FocusEvent } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import SearchField from './SearchField';

type Props = ComponentProps<typeof SearchField>;

type Args = Omit<Props, 'value' | 'onChange' | 'onFocus'>;

const Template = ((args: Args) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    action('onChange')(e.target.value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    action('onFocus')(e);
  };

  const handleEnter = action('onEnter');
  const handleSearch = action('onSearch');

  return (
    <SearchField
      {...args}
      variant="primary"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onEnter={handleEnter}
      onSearch={handleSearch}
    />
  );
}) as StoryTemplate<Args>;

const TemplatePrimaryWithIcon = ((args: Args) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    action('onChange')(e.target.value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    action('onFocus')(e);
  };

  const handleEnter = action('onEnter');
  const handleSearch = action('onSearch');

  return (
    <SearchField
      {...args}
      variant="primary"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onEnter={handleEnter}
      onSearch={handleSearch}
    />
  );
}) as StoryTemplate<Args>;

const TemplateSecondarySearchField = ((args: Args) => {
  const [value, setValue] = React.useState('');
  const { size, searchButtonLabel, searchButtonVariant, ...remainingProps } = args;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    action('onChange')(e.target.value);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    action('onFocus')(e);
  };

  const handleEnter = action('onEnter');
  const handleSearch = action('onSearch');

  return (
    <SearchField
      {...remainingProps}
      variant="secondary"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onEnter={handleEnter}
      onSearch={handleSearch}
    />
  );
}) as StoryTemplate<Args>;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Placeholder',
  size: 'sm',
  searchButtonLabel: 'Find my parts',
  searchButtonVariant: 'secondary',
};

export const PrimaryWithIcon = TemplatePrimaryWithIcon.bind({});
PrimaryWithIcon.args = {
  placeholder: 'Placeholder',
  size: 'xs',
  searchButtonVariant: 'secondary',
};
PrimaryWithIcon.storyName = 'PrimaryWithIcon';

export const Secondary = TemplateSecondarySearchField.bind({});
Secondary.args = {
  placeholder: 'Search...',
};
Secondary.argTypes = {
  size: {
    table: {
      disable: true,
    },
  },
  searchButtonLabel: {
    table: {
      disable: true,
    },
  },
  searchButtonVariant: {
    table: {
      disable: true,
    },
  },
};

export default createMeta({
  component: SearchField,
  title: 'Components/SearchFields/SearchField',
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    variant: {
      control: {
        disable: true,
      },
    },
  },
});
