import React from 'react';
import { makeStyles } from '../../../themes/core';
import SlantedContainer from './SlantedContainer';
import { createMeta } from '../../story-utils';
import Icon from '../Icon';
import { QuoteLeftSolid } from '../Icon/icons/commercial';
import Typography from '../Typography';
import Surface from '../Surfaces/Surface';

const useStyles = makeStyles()((theme) => ({
  root: {
    marginLeft: theme.layoutSpacing['spacing/400'],
  },
  customContent: {
    border: `2px dashed ${theme.color['border/onSurface100/focus']}`,
    padding: theme.layoutSpacing['spacing/400'],
    width: '220px',
    textAlign: 'center',
  },
}));

type Props = React.ComponentProps<typeof SlantedContainer>;
const Template = (args: Props) => <SlantedContainer {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
  children: <Icon icon={QuoteLeftSolid} size="sm" />,
};
Primitive.storyName = 'Icon16';

export const IconMd = Template.bind({});
IconMd.args = {
  children: <Icon icon={QuoteLeftSolid} size="md" />,
};
IconMd.storyName = 'Icon24';

export const Label = Template.bind({});
Label.args = {
  children: <Typography>label</Typography>,
};

const CustomTemplate = (args: Props) => {
  const { classes } = useStyles();

  return (
    <SlantedContainer {...args} className={classes.root}>
      <Surface color="100" className={classes.customContent}>
        <Typography>Content placeholder.</Typography>
        <Typography>To be replaced with custom content component.</Typography>
      </Surface>
    </SlantedContainer>
  );
};

export const Custom = CustomTemplate.bind({});
Custom.args = {};

export default createMeta({
  component: SlantedContainer,
  title: 'Components/SlantedContainers/SlantedContainer',

  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/\[object Object\]/g, 'Typography'),
    },
  },
});
