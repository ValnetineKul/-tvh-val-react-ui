import { action } from '@storybook/addon-actions';
import React from 'react';
import MenuItem from '../../../components/Menus/MenuItem';
import ActionsGroup from '../../../components/ActionsGroup';
import Button from '../../../components/Buttons/Button';
import IconButton from '../../../components/Buttons/IconButton';
import SplitButton from '../../../components/Buttons/SplitButton';
import { Print, Envelope, EllipsisH } from '../../../components/Icon/icons/functional';
import Icon from '../../../components/Icon';
import { createMeta, createTemplate } from '../../../story-utils';
import SectionHeader from './SectionHeader';

const Template = createTemplate(SectionHeader);

const actions = (
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
        !isSquashed ? (
          <IconButton icon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
        ) : (
          <MenuItem label="Print" startIcon={<Icon icon={Print} />} onClick={action('onPrintClick')} />
        ),
      ({ isSquashed }) =>
        !isSquashed ? (
          <IconButton icon={<Icon icon={Envelope} />} onClick={action('onEnvelopeClick')} />
        ) : (
          <MenuItem label="Envelope" startIcon={<Icon icon={Envelope} />} onClick={action('onEnvelopeClick')} />
        ),
    ]}
  />
);

const oneAction = (
  <ActionsGroup
    iconButtons={[
      ({ isSquashed }) =>
        !isSquashed ? (
          <IconButton icon={<Icon icon={EllipsisH} />} onClick={action('onEllipsisClick')} />
        ) : (
          <MenuItem label="Ellipis" startIcon={<Icon icon={EllipsisH} />} onClick={action('onEllipsisClick')} />
        ),
    ]}
  />
);

export const Primitive = Template.bind({});
Primitive.args = {
  title: 'Item Label',
  headerType: 'functional',
  subtitle: 'Subtitle',
  headerActions: actions,
};
Primitive.storyName = 'SectionHeader';

export const OneIconButton = Template.bind({});
OneIconButton.args = {
  ...Primitive.args,
  headerActions: oneAction,
};
OneIconButton.storyName = 'OneIconButton';

export default createMeta({
  component: SectionHeader,
  title: 'Patterns/Headers/SectionHeader',
  argTypes: {
    headerActions: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: '<ActionsGroup> or custom component if needed' },
      },
    },
  },
});
