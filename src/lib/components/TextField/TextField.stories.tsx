import { action } from '@storybook/addon-actions';
import React, { useRef, useState } from 'react';
import { UserCircle, Search } from '../Icon/icons/functional';
import type { StoryTemplate } from '../../story-utils';
import { createMeta, createTemplate } from '../../story-utils';
import IconButton from '../Buttons/IconButton';
import Icon from '../Icon';
import TextField from './TextField';
import Button from '../Buttons/Button';
import Modal from '../../patterns/Dialogs/Modal';
import DialogContent from '../../patterns/Dialogs/DialogContent';
import Typography from '../Typography';
import DialogFooter from '../../patterns/Dialogs/DialogFooter';

const Template = createTemplate(TextField);

type Props = React.ComponentProps<typeof TextField>;
type Args = Omit<Props, 'onChange'>;
const CharacterCountTemplate = ((args: Args) => {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      {...args}
      characterCount
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        action('onChange (value)')(e.target.value);
      }}
    />
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  maxLength: 100,
};
Primitive.storyName = 'none';

export const StartIcon = Template.bind({});
StartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={UserCircle} />,
};
StartIcon.storyName = 'startIcon';

export const EndIcon = Template.bind({});
EndIcon.args = {
  ...Primitive.args,
  endIcon: <IconButton icon={<Icon icon={Search} />} onClick={action('onIconButtonClick')} />,
};
EndIcon.storyName = 'endIcon';

export const Alignment = Template.bind({});
Alignment.args = {
  ...Primitive.args,
  value: 'john_doe',
  suffix: '@company.com',
  alignment: 'end',
};
Alignment.storyName = 'alignmentEnd';

export const CharacterCount = CharacterCountTemplate.bind({});
CharacterCount.args = {
  ...Primitive.args,
  maxLength: 10,
  type: 'text',
};
CharacterCount.storyName = 'characterCount';

export const Disabled = Template.bind({});
Disabled.args = {
  ...Primitive.args,
  value: 'Value',
  disabled: true,
};
Disabled.storyName = 'disabled';

const InputRefTemplate = (() => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>(null);
  const [nameError, setNameError] = useState<string>(null);
  const fieldRef = useRef<HTMLInputElement>(null);

  const scrollIntoView = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollIntoView({ behavior: 'smooth' });
      fieldRef.current.focus();
    }
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setName(null);
    setNameError(null);
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setNameError('This field cannot be empty!');
      scrollIntoView();
    } else handleClose();
  };

  const handleNameChange = (v: string) => {
    setName(v);
    setNameError(null);
  };

  return (
    <>
      <Button label="Open modal" variant="tertiary" onClick={handleClickOpen} />
      <Modal title="Dialog header" id="dialog-id" open={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div style={{ height: 200 }}>
              <Typography variant="body500">Please press Save button without completing Name field.</Typography>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    inputElementRef={fieldRef}
                    errorMessage={nameError}
                    type="text"
                    label="Name"
                    placeholder="Placeholder"
                    fullWidth
                    required
                  />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
                <li style={{ marginTop: '16px' }}>
                  <TextField type="text" label="Label" placeholder="Placeholder" fullWidth />
                </li>
              </ul>
            </div>
          </DialogContent>
          <DialogFooter
            actionButtons={[
              <Button type="submit" label="Save" variant="primary" />,
              <Button label="Cancel" variant="tertiary" onClick={handleClose} />,
            ]}
          />
        </form>
      </Modal>
    </>
  );
}) as StoryTemplate<Args>;

export const InputRef = InputRefTemplate.bind({});
InputRef.storyName = 'inputRef';

export default createMeta({
  component: TextField,
  title: 'Components/InputFields/TextField',
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
    alignment: {
      control: {
        disable: true,
      },
    },
    characterCount: {
      control: {
        disable: true,
      },
    },
    type: {
      options: ['text', 'number', 'password'],
      control: {
        type: 'radio',
      },
    },
    onChange: {
      action: { argTypesRegex: '^on.*' },
    },
    startIcon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    endIcon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    inputRef: {
      table: {
        disable: true,
      },
    },
    rows: {
      table: {
        disable: true,
      },
    },
    maxRows: {
      table: {
        disable: true,
      },
    },
    minRows: {
      table: {
        disable: true,
      },
    },
    multiline: {
      table: {
        disable: true,
      },
    },
    inputMultilineClassName: {
      table: {
        disable: true,
      },
    },
    inputClassName: {
      table: {
        disable: true,
      },
    },
  },
});
