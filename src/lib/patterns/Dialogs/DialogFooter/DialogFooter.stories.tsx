import { action } from '@storybook/addon-actions';
import React from 'react';
import Button from '../../../components/Buttons/Button';
import { createMeta, createTemplate } from '../../../story-utils';
import DialogFooter from './DialogFooter';

const Template = createTemplate(DialogFooter);

export const Primitive = Template.bind({});
Primitive.args = {
  actionButtons: [<Button variant="primary" label="Primary action" />, <Button variant="tertiary" label="Cancel" />],
  alternativeAction: 'AlternativeAction',
  onAlternativeActionClick: action('onAlternativeActionClick'),
};

Primitive.storyName = 'DialogFooter';

export default createMeta({
  component: DialogFooter,
  title: 'Patterns/Dialogs/DialogFooter',
  argTypes: {
    actionButtons: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'The action buttons of the component' },
      },
    },
    component: {
      control: {
        disable: true,
      },
    },
    onAlternativeActionClick: { control: { disable: true } },
  },
});
