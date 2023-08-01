import type { ComponentProps } from 'react';
import React, { useState } from 'react';
import { makeStyles } from '../../../../themes/core';
import { createMeta } from '../../../story-utils';
import type { StoryTemplate } from '../../../story-utils';
import NonModal from './NonModal';
import Typography from '../../../components/Typography';
import Button from '../../../components/Buttons/Button';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '320px',
  },
  buttons: {
    display: 'flex',
    marginTop: theme.layoutSpacing['spacing/400'],
    gap: theme.layoutSpacing['spacing/400'],
  },
}));

type Props = ComponentProps<typeof NonModal>;
type Args = Omit<Props, 'isOpen' | 'onClose'>;

const Template = ((args: Args) => {
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && (
        <Button
          variant="tertiary"
          label="Open Nonmodal"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      )}
      <NonModal
        {...args}
        isOpen={isOpen}
        className={classes.root}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Typography>
          We use cookies on this site to enhance your user experience. By clicking any link on this page you are giving
          your consent for us to set cookies.
        </Typography>
        <div className={classes.buttons}>
          <Button
            label="Accept cookies"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <Button
            variant="tertiary"
            label="Manage cookies"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </NonModal>
    </>
  );
}) as StoryTemplate<Args>;

export const Primitive = Template.bind({});
Primitive.args = {
  priority: 'normal',
  position: 'bottom-start',
  title: 'Cookies',
};

Primitive.storyName = 'NonModal';
export default createMeta({
  component: NonModal,
  title: 'Patterns/Dialogs/NonModal',
  argTypes: {
    isOpen: {
      control: {
        disable: true,
      },
    },
    title: {
      control: {
        disable: true,
      },
    },
    onClose: {
      control: {
        disable: true,
      },
    },
  },
});
