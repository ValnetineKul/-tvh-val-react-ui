import { action } from '@storybook/addon-actions';
import React from 'react';
import { createMeta, createTemplate } from '../../story-utils';
import Button from '../Buttons/Button';
import type { ToastStatus } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';

const SnackBars = () => {
  const { enqueueToast } = useToast();

  const handleClick =
    (status: ToastStatus, message: string, button: { label: string; action: () => void } | undefined) => () => {
      enqueueToast({ message, status, button }, { preventDuplicate: true });
    };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      <Button
        variant="primary"
        label="Show success toast"
        onClick={handleClick('success', 'Success toast', { label: 'Label', action: action('onAction') })}
      />
      <Button
        variant="primary"
        label="Show warning toast"
        onClick={handleClick('warning', 'Warning toast', { label: 'Undo', action: action('onUndo') })}
      />
      <Button variant="primary" label="Show error toast" onClick={handleClick('error', 'Error toast', undefined)} />
      <Button variant="primary" label="Show info toast" onClick={handleClick('info', 'Info toast', undefined)} />
      <Button
        variant="primary"
        label="Show loading toast"
        onClick={handleClick('loading', 'Loading toast', undefined)}
      />
    </div>
  );
};

const Template = createTemplate(ToastProvider);

export const Primitive = Template.bind({});
Primitive.args = {
  children: <SnackBars />,
};
Primitive.storyName = 'ToastList';

export default createMeta({
  component: ToastProvider,
  title: 'Components/Toasts/ToastList',
  parameters: {
    docs: {
      transformSource: (src: string) => `${src}

const SnackBars = () => {
  const { enqueueToast } = useToast();
  return (
    <Button
      label="Show success toast"
      onClick={() => enqueueToast({message: 'Sucess toast', status: 'success'})}
    />
    <Button
       label="Show warning toast"
       onClick={() => enqueueToast({message: 'Warning toast', status: 'warning'})}
    />
    <Button
      label="Show error toast"
      onClick={() => enqueueToast({message: 'Error toast', status: 'error'})}
    />
    <Button
      label="Show info toast"
      onClick={() => enqueueToast({message: 'Info toast', status: 'info'})}
    />
    <Button
      label="Show loading toast"
      onClick={() => enqueueToast({message: 'Loading toast', status: 'loading'})}
    />
  );
}`,
    },
  },
});
