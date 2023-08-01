import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import RadioButton from '../RadioButton';
import RadioButtonGroup from './RadioButtonGroup';

type Props = ComponentProps<typeof RadioButtonGroup>;
type Args = Omit<Props, 'value' | 'onChange' | 'children'>;

const Template = ((args: Args) => {
  const [value, setValue] = useState('option1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <RadioButtonGroup {...args} value={value} onChange={handleChange}>
      <RadioButton value="option1" label="RadioButton option" />
      <RadioButton value="option2" label="RadioButton option" />
      <RadioButton value="option3" label="RadioButton option" />
      <RadioButton value="option4" label="RadioButton option" />
      <RadioButton value="disabled" disabled label="Disabled option" />
    </RadioButtonGroup>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  required: true,
  name: 'radio-buttons',
};
Primitive.storyName = 'RadioButtonGroup';

export default createMeta({
  component: RadioButtonGroup,
  title: 'Components/RadioButtons/RadioButtonGroup',
  argTypes: {
    onChange: {
      table: {
        type: {
          detail:
            'Callback fired when a radio button is selected: (event: React.ChangeEvent<HTMLInputElement>) => void.',
        },
      },
    },
    value: {
      control: {
        disable: true,
      },
      table: {
        type: {
          detail: 'Value of the selected radio button.',
        },
      },
    },
  },
});
