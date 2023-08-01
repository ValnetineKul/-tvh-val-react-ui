import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import DateField from '../DateField';
import DateFormat from './DateFormat';

type Props = React.ComponentProps<typeof DateFormat>;
type Args = Omit<Props, 'date'>;

const Template = ((args: Args) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (v: Date) => {
    setDate(v);
    action('onDateChange')(v);
  };

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <span>Date format:&nbsp;</span>
        <DateFormat {...args} date={new Date(date).toISOString()} />
      </div>
      <DateField label="Date" value={date} onChange={handleDateChange} />
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  format: 'short',
};
Primitive.storyName = 'DateFormat';

export default createMeta({
  component: DateFormat,
  title: 'Components/Content/DateFormat',
  argTypes: {
    date: {
      control: {
        disable: true,
      },
    },
  },
});
