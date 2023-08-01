import { useArgs } from '@storybook/client-api';
import React from 'react';
import type { StoryTemplate } from '../../story-utils';
import Switch from './Switch';
import { createMeta } from '../../story-utils';

type Props = React.ComponentProps<typeof Switch>;

const Template = ((args: Props) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Switch
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
  label: 'Switch text label',
  value: 'Switch text value',
  name: 'switch-name',
  checked: false,
  disabled: false,
  spaceBetween: false,
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
  label: <span>Switch component Label</span>,
};
ComponentLabel.storyName = 'ComponentLabel';

export default createMeta({
  component: Switch,
  title: 'Components/Switches/Switch',
  argTypes: {
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    label: {
      control: {
        disable: true,
      },
    },
  },
});
