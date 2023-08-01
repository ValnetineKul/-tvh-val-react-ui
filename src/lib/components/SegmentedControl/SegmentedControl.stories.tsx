import type { ComponentProps } from 'react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { createMeta, createTemplate } from '../../story-utils';
import Icon from '../Icon';
import { List, Grid } from '../Icon/icons/functional';
import SegmentedControl from './SegmentedControl';

type Props = ComponentProps<typeof SegmentedControl>;

const Template = createTemplate(SegmentedControl);

const segments: Props['segmentList'] = [
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
  },
  {
    label: 'Year',
    value: 'year',
  },
];

const segmentsWithLongLabel: Props['segmentList'] = [
  {
    label: 'Normal label',
    value: 'normalLabel',
  },
  {
    label: 'Extra long label which is not recommended. Extra long label which is not recommended.',
    value: 'longLabel',
  },
];

const segmentsWithIcons: Props['segmentList'] = [
  {
    label: 'Listview',
    value: 'listview',
    icon: <Icon icon={List} />,
  },
  {
    label: 'Gridview',
    value: 'gridview',
    icon: <Icon icon={Grid} />,
  },
];

const segmentsWithCurrencies: Props['segmentList'] = [
  {
    label: '\u20AC',
    value: 'euru',
  },
  {
    label: '\u0024',
    value: 'dollar',
  },
  {
    label: '\u00A3',
    value: 'pound',
  },
  {
    label: 'kr',
    value: 'krona',
  },
  {
    label: '\u00A5',
    value: 'yen',
    disabled: true,
  },
];

export const Primitive = Template.bind({});
Primitive.args = {
  name: 'Date format',
  segmentList: segments,
  onSegmentChange: (v) => action('onSegmentChange (segment)')(v),
  defaultIndex: 2,
};
Primitive.storyName = 'Text';

export const LongText = Template.bind({});
LongText.args = {
  name: 'Label examples',
  segmentList: segmentsWithLongLabel,
  onSegmentChange: (v) => action('onSegmentChange (segment)')(v),
  defaultIndex: 1,
};
LongText.storyName = 'LongText';

export const IconOnly = Template.bind({});
IconOnly.args = {
  name: 'Choose view',
  segmentList: segmentsWithIcons,
  onSegmentChange: (v) => action('onSegmentChange (segment)')(v),
  defaultIndex: 1,
};
IconOnly.storyName = 'IconOnly';

export const Currency = Template.bind({});
Currency.args = {
  name: 'Currency form',
  segmentList: segmentsWithCurrencies,
  onSegmentChange: (v) => action('onSegmentChange (segment)')(v),
  defaultIndex: 1,
};

export default createMeta({
  component: SegmentedControl,
  title: 'Components/SegmentedControls/SegmentedControl',
  argTypes: {
    segmentList: {
      control: {
        disable: true,
      },
    },
    defaultIndex: {
      control: {
        disable: true,
      },
    },
  },
});
