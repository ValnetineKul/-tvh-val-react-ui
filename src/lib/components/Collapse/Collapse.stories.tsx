import React, { useState } from 'react';
import { makeStyles } from '../../../themes/core';
import Button from '../Buttons/Button';
import Divider from '../Divider';
import { AngleDown, AngleUp } from '../Icon/icons/functional';
import Icon from '../Icon';
import Typography from '../Typography';
import Collapse from './Collapse';
import { createMeta } from '../../story-utils';

const useStyles = makeStyles()((theme) => ({
  root: {
    paddingLeft: theme.layoutSpacing['spacing/400'],
    paddingBlock: theme.layoutSpacing['spacing/400'],
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Template = (args: React.ComponentProps<typeof Collapse>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { classes } = useStyles();

  return (
    <>
      <Button
        variant="link"
        onClick={() => setIsOpen(!isOpen)}
        label="Open"
        endIcon={<Icon icon={isOpen ? AngleUp : AngleDown} />}
      />
      <Collapse {...args} open={isOpen}>
        <div className={classes.root}>
          <div className={classes.row}>
            <Typography weight="emphasis">Total products</Typography>
            <Typography>$ 7,000.30</Typography>
          </div>

          <div className={classes.row}>
            <Typography weight="emphasis">Est. taxes</Typography>
            <Typography>$ 3.30</Typography>
          </div>

          <div className={classes.row}>
            <Typography weight="emphasis">Est. fees</Typography>
            <Typography>$ 32.30</Typography>
          </div>
        </div>
      </Collapse>
      <Divider />
    </>
  );
};

export const Primitive = Template.bind({});
Primitive.storyName = 'Collapse';

export default createMeta({
  component: Collapse,
  title: 'Components/Collapse/Collapse',
  argTypes: {
    open: {
      control: {
        disable: true,
      },
    },
  },
});
