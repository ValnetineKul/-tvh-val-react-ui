import React from 'react';
import { makeStyles } from '../../../../themes/core';
import ButtonBase from './ButtonBase';
import Icon from '../../Icon';
import { PersonDolly } from '../../Icon/icons/functional';
import Typography from '../../Typography';
import { createMeta } from '../../../story-utils';

const useStyles = makeStyles({ name: 'ButtonBaseExample' })((theme) => ({
  root: {
    padding: theme.layoutSpacing['spacing/350'],
    flexDirection: 'column',
  },
}));

const Template = (args: React.ComponentProps<typeof ButtonBase>) => {
  const { classes } = useStyles();
  return (
    <ButtonBase {...args} className={classes.root}>
      <Icon icon={PersonDolly} />
      <Typography>Interactive element</Typography>
    </ButtonBase>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  color: '100',
};
Primitive.storyName = 'ButtonBase';

export default createMeta({
  component: ButtonBase,
  title: 'Foundations/Surfaces/ButtonBase',

  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/\[object Object\]/g, 'Typography'),
    },
  },
});
