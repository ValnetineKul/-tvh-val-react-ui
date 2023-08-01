import React from 'react';

import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './Alert';
import InlineMessage from '../InlineMessage';
import { Narwhal, WifiSlash, Wrench } from '../Icon/icons/functional';
import Icon from '../Icon';
import Typography from '../Typography';
import { Status } from './Alert.types';
import Button from '../Buttons/Button';
import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles()(() => ({
  link: {
    verticalAlign: 'baseline',
  },
}));

export default {
  title: 'Components/Alerts/Alert',
  component: Alert,
  args: {
    status: 'info',
    message: 'example alert message...',
  },
  argTypes: {
    status: {
      options: [...Object.values(Status)],
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});

export const WithInlineMessage = Template.bind({});
WithInlineMessage.args = {
  onClose: action('close'),
  message: <InlineMessage message="Inline message." actionLabel="Action" onAction={action('onAction')} />,
};

export const Custom1 = Template.bind({});
Custom1.args = {
  status: 'warning',
  icon: <Icon icon={WifiSlash} />,
  message: (
    <InlineMessage message="You are in offline mode." actionLabel="More Information" onAction={action('onAction')} />
  ),
};

export const Custom2 = Template.bind({});
Custom2.args = {
  icon: <Icon icon={Wrench} />,
  message: (
    <Typography>
      Maintenance is scheduled on{' '}
      <Typography component="b" weight="emphasis">
        Saturday, December 10 at 16:00 UTC.
      </Typography>{' '}
      The platform will be unavailable for a couple of hours.
    </Typography>
  ),
};

const TemplateCustom3: ComponentStory<typeof Alert> = (args) => {
  const { classes } = useStyles();

  return (
    <Alert
      {...args}
      message={
        <Typography>
          This is an alert message with a <Button label="link" variant="link" href="/" className={classes.link} />,{' '}
          <Typography component="b" weight="emphasis">
            bold text
          </Typography>{' '}
          and a custom icon
        </Typography>
      }
    />
  );
};

export const Custom3 = TemplateCustom3.bind({});
Custom3.args = {
  icon: <Icon icon={Narwhal} />,
};
