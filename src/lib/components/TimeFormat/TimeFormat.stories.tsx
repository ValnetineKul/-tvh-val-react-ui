import React, { useState } from 'react';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import TimeFormat from './TimeFormat';
import Button from '../Buttons/Button';

type Props = React.ComponentProps<typeof TimeFormat>;
type Args = Omit<Props, 'date'>;

const Template = ((args: Args) => {
  const [date, setDate] = useState<Date>(new Date());

  const handleHourChange = (hours: number) => {
    setDate(new Date(date.setHours(date.getHours() + hours)));
  };

  const handleMinutesChange = (hours: number) => {
    setDate(new Date(date.setMinutes(date.getMinutes() + hours)));
  };

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <span>Time format:&nbsp;</span>
        <TimeFormat {...args} date={new Date(date).toISOString()} />
      </div>
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
  format: 'short',
};
Primitive.storyName = 'TimeFormat';

export default createMeta({
  component: TimeFormat,
  title: 'Components/Content/TimeFormat',
  argTypes: {
    date: {
      control: {
        disable: true,
      },
    },
  },
});
