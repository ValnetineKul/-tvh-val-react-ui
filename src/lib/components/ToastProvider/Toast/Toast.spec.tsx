import React from 'react';
import { render } from '../../../test-utils';
import Toast from './Toast';

describe('Toast', () => {
  const actionMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should have action button with function call', () => {
    const { getByRole } = render(
      <Toast message="Info Toast" status="info" button={{ label: 'btn label', action: actionMock }} />
    );

    const actionButton = getByRole('button', { name: 'btn label' });
    expect(actionButton).toBeInTheDocument();

    actionButton.click();
    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it('Should be closed after hitting close button', async () => {
    jest.useFakeTimers();

    const { getByRole } = render(<Toast message="Info Toast" status="info" closeAction={actionMock} />);
    const closeButton = getByRole('button', { name: 'close' });

    closeButton.click();
    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
