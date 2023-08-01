import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import DateField from '../DateField';
import RelativeTime from './RelativeTime';
import Button from '../Buttons/Button';

type Props = React.ComponentProps<typeof RelativeTime>;
type Args = Omit<Props, 'date'>;

const Template = ((args: Args) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (v: Date) => {
    setDate(v);
    action('onDateChange')(v);
  };

  const handleHourChange = (hours: number) => {
    setDate(new Date(date.setHours(date.getHours() + hours)));
  };

  const handleMinutesChange = (hours: number) => {
    setDate(new Date(date.setMinutes(date.getMinutes() + hours)));
  };

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <span>Relative Time:&nbsp;</span>
        <RelativeTime {...args} date={new Date(date).toISOString()} />
      </div>
      <DateField label="Date" value={date} onChange={handleDateChange} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button label="-1 hour" variant="tertiary" onClick={() => handleHourChange(-1)} />
        <Button label="+1 hour" variant="tertiary" onClick={() => handleHourChange(1)} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <Button label="-1 minute" variant="tertiary" onClick={() => handleMinutesChange(-1)} />
        <Button label="+1 minute" variant="tertiary" onClick={() => handleMinutesChange(1)} />
      </div>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  precision: 'sameday',
};
Primitive.storyName = 'RelativeTime';

export default createMeta({
  component: RelativeTime,
  title: 'Components/Content/RelativeTime',
  argTypes: {
    date: {
      control: {
        disable: true,
      },
    },
  },
});
