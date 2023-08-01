import React from 'react';
import { act, userEvent, render, waitForElementToBeRemoved } from '../../test-utils';
import { ToastProvider, useToast } from './ToastProvider';
import type { ToastListProps } from './ToastList';

const Component = ({
  onAction,
  onCloseAction,
  status = 'success',
}: {
  onAction: () => void;
  onCloseAction: () => void;
  status?: ToastListProps['message']['status'];
}) => {
  const { enqueueToast } = useToast();
  return (
    <button
      type="button"
      onClick={() =>
        enqueueToast({
          message: 'toast message',
          status,
          button: { label: 'action', action: onAction },
          closeAction: onCloseAction,
        })
      }
    >
      show toast
    </button>
  );
};

jest.mock('uuid', () => {
  let value = 1;
  return {
    // eslint-disable-next-line no-plusplus
    v4: jest.fn(() => value++),
  };
});

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should show toast with parameters', () => {
    const onAction = jest.fn();
    const { getByRole, queryByText } = render(
      <ToastProvider>
        <Component onAction={onAction} onCloseAction={jest.fn()} />
      </ToastProvider>
    );

    const button = getByRole('button', { name: /show toast/ });
    userEvent.click(button);
    expect(queryByText('toast message')).toBeInTheDocument();

    const actionButton = queryByText('action');
    actionButton && userEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('Should close toast', async () => {
    const onAction = jest.fn();
    const onCloseAction = jest.fn();
    const { getByRole, queryByText, findByRole } = render(
      <ToastProvider>
        <Component onAction={onAction} onCloseAction={onCloseAction} />
      </ToastProvider>
    );

    const button = getByRole('button', { name: 'show toast' });
    userEvent.click(button);
    expect(queryByText('toast message')).toBeInTheDocument();

    const closeButton = await findByRole('button', { name: 'close' });
    closeButton && userEvent.click(closeButton);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onCloseAction).toHaveBeenCalled();
    await waitForElementToBeRemoved(() => queryByText('toast message'));
  });

  it('Should not close error toast automatically', async () => {
    const onAction = jest.fn();
    const onCloseAction = jest.fn();
    const { getByRole, queryByText } = render(
      <ToastProvider>
        <Component onAction={onAction} onCloseAction={onCloseAction} status="error" />
      </ToastProvider>
    );

    const button = getByRole('button', { name: 'show toast' });
    userEvent.click(button);
    expect(queryByText('toast message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1_000_000_000);
    });
    expect(queryByText('toast message')).toBeInTheDocument();
  });

  it('Should show only 5 toasts and expand them by click', async () => {
    const onAction = jest.fn();
    const { getByRole, findAllByText } = render(
      <ToastProvider>
        <Component onAction={onAction} onCloseAction={jest.fn()} />
      </ToastProvider>
    );

    const button = getByRole('button', { name: 'show toast' });
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    const toasts = await findAllByText('toast message');
    expect(toasts).toHaveLength(5);

    // TODO: Uncomment this when react-testing-library will be updated to the 13th version
    // const provider = container?.firstChild?.nextSibling as HTMLDivElement;
    //
    // userEvent.click(provider);
    //
    // act(() => {
    //   jest.advanceTimersByTime(1000);
    // });
    // expect((container?.firstChild?.nextSibling as HTMLDivElement).className).not.toMatch(/Toast-root/);
  });
});
