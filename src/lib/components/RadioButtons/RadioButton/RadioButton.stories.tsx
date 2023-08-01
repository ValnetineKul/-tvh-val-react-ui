import { useArgs } from '@storybook/client-api';
import type { ComponentProps } from 'react';
import React from 'react';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import RadioButton from './RadioButton';

type Props = ComponentProps<typeof RadioButton>;
type Args = Omit<Props, 'onChange'>;

const Template = ((args: Args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <RadioButton
      {...args}
      checked={checked}
      onChange={(...params) => {
        updateArgs({ checked: params[1] });
      }}
    />
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'RadioButton label',
  value: 'RadioButton value',
  name: 'radio-button',
  checked: false,
  disabled: false,
};

Primitive.storyName = 'RadioButton';

export default createMeta({
  component: RadioButton,
  title: 'Components/RadioButtons/RadioButton',
  argTypes: {
    onChange: {
      action: { argTypesRegex: '^on.*' },
      table: {
        type: {
          detail:
            'Callback fired when the state is changed: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void.',
        },
      },
    },
    value: {
      table: {
        type: {
          detail: 'Value of the selected radio button.',
        },
      },
    },
  },
});
