import { useArgs } from '@storybook/client-api';
import React from 'react';
import type { StoryTemplate } from '../../story-utils';
import Checkbox from './Checkbox';
import { createMeta } from '../../story-utils';

type Props = React.ComponentProps<typeof Checkbox>;

const Template = ((args: Props) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(...params) => {
        updateArgs({ checked: params[1] });
        args.onChange?.(...params);
      }}
    />
  );
}) as StoryTemplate<Props>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Checkbox text label',
  value: 'Checkbox text value',
  name: 'checkbox-name',
  checked: false,
  disabled: false,
  indeterminate: false,
};
Primitive.storyName = 'TextLabel';
Primitive.argTypes = {
  label: {
    control: {
      disable: false,
    },
  },
};

export const ComponentLabel = Template.bind({});
ComponentLabel.args = {
  ...Primitive.args,
  label: <span>Checkbox with component label</span>,
};
ComponentLabel.storyName = 'ComponentLabel';

export default createMeta({
  component: Checkbox,
  title: 'Components/Checkboxes/Checkbox',
  argTypes: {
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    label: {
      control: {
        disable: true,
      },
    },
    formControlLabelClassName: {
      table: {
        disable: true,
      },
    },
  },
});
