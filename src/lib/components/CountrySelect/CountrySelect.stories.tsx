import React, { useState } from 'react';
import CountrySelect from './index';
import type { CountryItem } from './CountrySelect';
import type { StoryTemplate } from '../../story-utils';
import Button from '../Buttons/Button';
import Banner from '../Banner';
import { createMeta } from '../../story-utils';

type Props = React.ComponentProps<typeof CountrySelect>;

type Args = Omit<Props, 'onChange' | 'value'>;

const countries: CountryItem[] = [
  { code: 'BE', name: 'Belgium' },
  { code: 'BY', name: 'Belarus' },
  { code: 'GE', name: 'Georgia' },
  { code: 'RU', name: 'Russia' },
  { code: 'CY', name: 'Cyprus' },
];

const Template = ((args: Args) => {
  const [value, setValue] = useState<CountryItem | null>({ code: 'BE', name: 'Belgium' });
  return <CountrySelect {...args} onChange={(_, v) => setValue(v as CountryItem)} value={value} />;
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  options: countries,
  label: 'Label',
  placeholder: 'Select a value',
  disabled: false,
  fullWidth: false,
  required: false,
  readOnly: false,
};

Primitive.storyName = 'Single';

const ErrorTemplate = ((args: Args) => {
  const [value, setValue] = useState<CountryItem | null>(null);

  return (
    <CountrySelect
      id="select-id"
      {...args}
      onChange={(_, v) => setValue(v as CountryItem)}
      value={value}
      NoOptionsText={
        <Banner
          status="error"
          message="Could not load list. Please refresh."
          button={<Button label="Refresh" onClick={() => 'TO_DO'} variant="tertiary" />}
          direction="vertical"
        />
      }
    />
  );
}) as StoryTemplate<Args>;

export const Error = ErrorTemplate.bind({});
Error.args = {
  ...Primitive.args,
  options: [],
};

export default createMeta({
  title: 'Components/Selects/CountrySelect',
  component: CountrySelect,
});
