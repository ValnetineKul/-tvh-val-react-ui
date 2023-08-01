import React from 'react';
import { makeStyles } from '../../../../themes/core';
import TextField from '../../TextField';
import Typography from '../../Typography';
import ActionsGroup from '../../ActionsGroup';
import Button from '../../Buttons/Button';
import Surface from './Surface';
import { createMeta } from '../../../story-utils';

const useStyles = makeStyles({ name: 'SurfaceExample' })((theme) => ({
  root: {
    padding: theme.layoutSpacing['spacing/400'],
  },
}));

const Template = (args: React.ComponentProps<typeof Surface>) => {
  const { classes } = useStyles();
  return (
    <Surface {...args} className={classes.root}>
      <Typography variant="h1">Surface example</Typography>
      <Typography>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Typography>
      <Typography secondary>Secondary text</Typography>
      <br />
      <TextField label="label" value="My input" maxLength={10} characterCount errorMessage="Error message" />
      <br />
      <br />
      <ActionsGroup
        buttons={[
          () => <Button variant="primary" label="Primary button" />,
          () => <Button variant="secondary" label="Secondary button" />,
        ]}
      />
    </Surface>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  color: '100',
};
Primitive.storyName = 'Surface';

export default createMeta({
  component: Surface,
  title: 'Foundations/Surfaces/Surface',

  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/\[object Object\]/g, 'Typography'),
    },
  },
});
