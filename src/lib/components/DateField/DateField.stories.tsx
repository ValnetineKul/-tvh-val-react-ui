import React, { useState } from 'react';
import type { ComponentProps } from 'react';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '../../../themes/core';
import { createMeta } from '../../story-utils';
import type { StoryTemplate } from '../../story-utils';
import DateField from './DateField';

const useStyles = makeStyles()(() => ({
  root: {
    width: '280px',
  },
}));

type Props = ComponentProps<typeof DateField>;

type Args = Omit<Props, 'startValue' | 'endValue' | 'onChange' | 'value' | 'dateRange'>;

const Template = ((args: Args) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleDateChange = (v: Date | null) => {
    setDate(v);
    action('onDateChange')(v);
  };

  return <DateField {...args} value={date} onChange={handleDateChange} />;
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Date',
  disabled: false,
  fullWidth: false,
  readOnly: false,
  isCalendarDisabled: false,
  required: false,
};

Primitive.argTypes = {
  value: {
    control: {
      disable: true,
    },
    table: {
      disable: false,
    },
  },
};

Primitive.storyName = 'DateField';

const DateRangeTemplate = ((args: Args) => {
  const { classes } = useStyles();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateRange = (start: Date | null, end: Date | null) => {
    if (start && end && end < start) {
      setErrorMessage('Invalid date range');
    } else {
      setErrorMessage('');
    }
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);

    validateRange(start, end);

    action('onDateChange')(start, end);
  };

  return (
    <DateField
      {...args}
      dateRange
      className={classes.root}
      startValue={startDate}
      endValue={endDate}
      onChange={handleDateChange}
      errorMessage={errorMessage || args.errorMessage}
    />
  );
}) as StoryTemplate<Args>;

export const DateRange = DateRangeTemplate.bind({});
DateRange.args = {
  ...Primitive.args,
};

DateRange.argTypes = {
  dateRange: {
    table: {
      disable: false,
    },
    control: {
      disable: true,
    },
  },
  startValue: {
    control: {
      disable: true,
    },
    table: {
      disable: false,
    },
  },
  endValue: {
    control: {
      disable: true,
    },
    table: {
      disable: false,
    },
  },
  toLabel: {
    table: {
      type: { summary: 'The text between the two date fields' },
      disable: false,
    },
  },
};

DateRange.storyName = 'DateRange';

export default createMeta({
  component: DateField,
  title: 'Components/InputFields/DateField',
  argTypes: {
    dateRange: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    startValue: {
      table: {
        disable: true,
      },
    },
    endValue: {
      table: {
        disable: true,
      },
    },
    toLabel: {
      table: {
        disable: true,
      },
    },
    isCalendarDisabled: {
      table: {
        type: { summary: 'If true the calendar picker will not open on textfield click' },
      },
    },
  },
});
