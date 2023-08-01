import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { StoryTemplate } from '../../story-utils';
import { createMeta } from '../../story-utils';
import type { NumberFieldProps } from './NumberField';
import NumberField from './NumberField';

const Template = ((args: NumberFieldProps) => {
  const [number, setNumber] = useState(null);

  const handleChange = (value: number) => {
    action('onChange')(value);
    setNumber(value);
  };

  return <NumberField {...args} value={number} onChange={handleChange} />;
}) as StoryTemplate<NumberFieldProps>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Quantity',
};
Primitive.storyName = 'NumberField';

export default createMeta({
  component: NumberField,
  title: 'Components/InputFields/NumberField',
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
    decimalScale: {
      table: {
        type: {
          summary: 'It defines number of digits that could be added after decimalSeparator',
        },
      },
    },
  },
});
