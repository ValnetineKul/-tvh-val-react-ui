import { action } from '@storybook/addon-actions';
import React from 'react';
import MenuItem from '../../../components/Menus/MenuItem';
import StatusTag from '../../../components/Tags/StatusTag';
import ActionsGroup from '../../../components/ActionsGroup';
import Button from '../../../components/Buttons/Button';
import IconButton from '../../../components/Buttons/IconButton';
import SplitButton from '../../../components/Buttons/SplitButton';
import { Print, Envelope } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import { createMeta, createTemplate } from '../../../story-utils';
import PageHeader from './PageHeader';

const Template = createTemplate(PageHeader);

export const Primitive = Template.bind({});
Primitive.args = {
  title: 'Item Label',
  subtitle: 'Subtitle',
  headerType: 'functional',
  headerActions: (
    <ActionsGroup
      buttons={[
        ({ isFullWidth }) => (
          <SplitButton
            onClick={action('onButton1Click')}
            onDropdownClick={action('onDropdownClick')}
            label="Button 1"
            fullWidth={isFullWidth}
          />
        ),
        ({ isFullWidth }) => (
          <Button label="Button 2" onClick={action('onButton2Click')} variant="secondary" fullWidth={isFullWidth} />
        ),
      ]}
      iconButtons={[
        ({ isSquashed }) =>
          isSquashed ? (
            <MenuItem label="Print" startIcon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
          ) : (
            <IconButton icon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
          ),
        ({ isSquashed }) =>
          isSquashed ? (
            <MenuItem label="Envelope" startIcon={<Icon icon={Envelope} />} onClick={action('onEnvelopeClick')} />
          ) : (
            <IconButton icon={<Icon icon={Envelope} />} onClick={action('onEnvelopeClick')} />
          ),
      ]}
    />
  ),
};
Primitive.storyName = 'PageHeader';

export const WithTag = Template.bind({});
WithTag.args = {
  ...Primitive.args,
  tag: <StatusTag label="Tag" status="neutral" />,
};
WithTag.storyName = 'PageHeaderWithTag';

export default createMeta({
  component: PageHeader,
  title: 'Patterns/Headers/PageHeader',
  argTypes: {
    headerActions: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: '<ActionsGroup> or custom component if needed' },
      },
    },
    tag: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: '<Tag> or <StatusTag>' },
      },
    },
  },
});
