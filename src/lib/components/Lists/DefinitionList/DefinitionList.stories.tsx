import type { ComponentProps } from 'react';
import React from 'react';
import { makeStyles } from '../../../../themes/core';
import type { StoryTemplate } from '../../../story-utils';
import { createMeta } from '../../../story-utils';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { Print } from '../../Icon/icons/functional';
import DefinitionList from './DefinitionList';

type Props = ComponentProps<typeof DefinitionList>;

const useStyles = makeStyles()(() => ({
  print: {
    marginBottom: 20,
    '@media print': {
      display: 'none',
    },
  },
}));

const Template = ((args: Props) => {
  const { classes } = useStyles();
  return (
    <>
      <div className={classes.print}>
        <IconButton
          size="md"
          icon={<Icon icon={Print} />}
          onClick={() => window.print()}
          tooltipLabel="Print definition list"
        />
      </div>
      <DefinitionList {...args} />
    </>
  );
}) as StoryTemplate<Props>;

const definitions = [
  {
    key: 'Command modes',
    value: '0-5V Analog, RS 232, TTL Serials',
  },
  {
    key: 'CAN bus interface',
    value: '1Mbit/s w. multiple protocol support',
  },
  {
    key: 'Build quality',
    keySubtitle: 'Build quality includes verification',
    value: 'Dual 3-phase high-power drivers',
    valueSubtitle: '3-phase is 1-2-3',
  },
  {
    key: 'DC motor power',
    value: '500A',
  },
  {
    key: 'Power source(s)',
    value: '1',
  },
  {
    key: 'Protection',
    value: 'Programmable current limit up to 500A',
  },
  {
    key: 'Programming language',
    value: 'Built-in for automatic/customised functionality',
  },
  {
    key: 'Sinusoidal mode',
    value: 'Efficient Field Oriented Control (FOC)',
  },
];

export const Primitive = Template.bind({});
Primitive.args = {
  definitions,
  cols: 1,
  header: 'Header',
  width: 'fullWidth',
  columnDistribution: '50/50',
};

Primitive.storyName = 'DefinitionList';

export default createMeta({
  component: DefinitionList,
  title: 'Components/Lists/DefinitionList',
  argTypes: {
    definitions: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Definitions' },
      },
    },
    columnDistribution: {
      options: ['10/90', '20/80', '30/70', '40/60', '50/50'],
      control: {
        type: 'select',
      },
    },
    cols: {
      table: {
        type: { summary: 'For mobile view is only one column applied' },
      },
    },
    width: {
      table: {
        type: { summary: 'For mobile view is only fullWidth' },
      },
    },
  },
});
