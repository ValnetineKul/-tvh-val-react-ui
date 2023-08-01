import React from 'react';
import { action } from '@storybook/addon-actions';
import CallToActionButton from './CallToActionButton';
import { createMeta, createTemplate } from '../../../story-utils';
import { AngleLeft } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import { buttonBaseStoryArgs } from '../../ButtonBase';

const Template = createTemplate(CallToActionButton);

export const Primitive = Template.bind({});
Primitive.args = {
  onClick: action('onClick'),
  label: 'Label',
  variant: 'primary',
  buttonProps: {
    'data-tms-banner-name': 'title',
    'data-tms-banner-id': 'drupal_internal__id',
    'data-tms-banner-creative': `sectionLabel field_banner_size`,
  },
};

Primitive.storyName = 'CallToActionButton';

export const WithIcon = Template.bind({});
WithIcon.args = {
  onClick: action('onClick'),
  icon: <Icon icon={AngleLeft} />,
  label: 'Label',
  variant: 'primary',
};

WithIcon.storyName = 'startIcon';

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  onClick: action('onClick'),
  icon: <Icon icon={AngleLeft} />,
  variant: 'primary',
};

WithoutLabel.storyName = 'iconOnly';

export default createMeta({
  component: CallToActionButton,
  title: 'Components/Buttons/CallToActionButton',
  argTypes: {
    onClick: {
      control: { disable: true },
    },
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    ...buttonBaseStoryArgs,
  },
});
