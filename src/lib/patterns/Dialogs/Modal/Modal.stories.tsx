import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import useScreenSize from '../../../hooks/useScreenSize';
import Button from '../../../components/Buttons/Button';
import { FileUpload } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import TextField from '../../../components/TextField';
import Typography from '../../../components/Typography';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import DialogContent from '../DialogContent';
import DialogFooter from '../DialogFooter';
import Modal from './Modal';

type Props = ComponentProps<typeof Modal>;
type Args = Omit<Props, 'open' | 'onClose'>;

const Template = ((args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const isDesktop = useScreenSize('Tablet').isTabletUp;

  return (
    <>
      <Button label="Open modal" variant="tertiary" onClick={handleClickOpen} />
      <Modal {...args} open={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Typography variant="body500">
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <div style={{ marginTop: '16px' }}>
              <Button startIcon={<Icon icon={FileUpload} title="start" />} variant="secondary" label="Upload file" />
            </div>
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
              <li style={{ marginTop: '16px' }}>
                <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
              </li>
              <li style={{ marginTop: '16px' }}>
                <TextField type="text" label="Label" placeholder="Placeholder" fullWidth required />
              </li>
            </ul>
          </DialogContent>
          <DialogFooter
            direction={isDesktop && args.size !== 'sm' ? 'horizontal' : 'vertical'}
            actionButtons={[
              <Button type="submit" label="Primary action" variant="primary" />,
              <Button label="Cancel" variant="tertiary" onClick={handleClose} />,
            ]}
            alternativeAction="AlternativeAction"
          />
        </form>
      </Modal>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  size: 'md',
  id: 'dialog-title',
  title: 'Dialog header',
};

Primitive.storyName = 'Modal';

Primitive.argTypes = {
  content: {
    table: {
      disable: false,
    },
  },
};

export default createMeta({
  component: Modal,
  title: 'Patterns/Dialogs/Modal',
  argTypes: {
    onClose: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    id: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'aria-labelledby={id} refers to the modal title with id={id}' },
      },
    },
    open: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'If true, the modal is open' },
      },
    },
    ref: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Used for transition' },
      },
    },
  },
});
