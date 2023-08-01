import React, { useState } from 'react';
import { makeStyles } from '../../../themes/core';
import TextField from '../TextField';
import Typography from '../Typography';
import Button from '../Buttons/Button';
import Scrim from './Scrim';
import { createMeta } from '../../story-utils';
import Modal from '../../patterns/Dialogs/Modal';
import DialogContent from '../../patterns/Dialogs/DialogContent/DialogContent';
import DialogFooter from '../../patterns/Dialogs/DialogFooter';
import Banner from '../Banner';

const useStyles = makeStyles({ name: 'SurfaceExample' })((theme) => ({
  root: {
    margin: `-${theme.layoutSpacing['spacing/400']}`,
    padding: theme.layoutSpacing['spacing/400'],
  },
}));

const Template = (args: React.ComponentProps<typeof Scrim>) => {
  const { classes } = useStyles();

  const [isOpen, setIsOpen] = useState(true);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <Button label="Open modal" variant="tertiary" onClick={handleClickOpen} />
      <Modal open={isOpen} onClose={handleClose} title="Dialog header" id="modal-id">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Scrim
              {...args}
              className={classes.root}
              innerChildren={<Banner status="info" message="The operation is taking longer than expected." closable />}
            >
              <Typography variant="body500">
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </Typography>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
                </li>
              </ul>
            </Scrim>
          </DialogContent>
          <DialogFooter
            actionButtons={[
              <Button type="submit" label="Primary action" variant="primary" isLoading={args.isOpen} />,
              <Button label="Cancel" variant="tertiary" onClick={handleClose} disabled={args.isOpen} />,
            ]}
          />
        </form>
      </Modal>
    </>
  );
};

export const Primitive = Template.bind({});
Primitive.args = {
  isOpen: true,
  variant: 'light',
};
Primitive.storyName = 'Scrim';

export default createMeta({
  component: Scrim,
  title: 'Components/Scrims/Scrim',
  argTypes: {
    onClick: {
      control: { disable: true },
    },
    innerChildren: {
      control: { disable: true },
    },
  },

  parameters: {
    docs: {
      transformSource: (src: string) => src.replace(/\[object Object\]/g, 'Typography'),
    },
  },
});
