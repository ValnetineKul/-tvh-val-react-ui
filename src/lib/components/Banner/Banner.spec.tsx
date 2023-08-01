import React from 'react';
import { render } from '../../test-utils';
import Button from '../Buttons/Button/Button';
import Banner from './Banner';

describe('Banner', () => {
  it('Should render direction: horizontal correctly', () => {
    const { container } = render(<Banner status="info" message="Banner message" />);
    expect(container.firstChild).toMatchSnapshot('horizontal');
  });

  it('Should render direction: vertical correctly', () => {
    const { container } = render(<Banner status="info" direction="vertical" message="Banner message" />);
    expect(container.firstChild).toMatchSnapshot('vertical');
  });

  it('Should render custom component correctly', () => {
    const { container } = render(<Banner status="info" message={<div>Message</div>} />);
    expect(container.firstChild).toMatchSnapshot('customComponent');
  });

  it('Should have action button with function call', () => {
    const actionMock = jest.fn();
    const { getAllByRole } = render(
      <Banner
        status="info"
        closable
        button={<Button label="btn label" variant="primary" onClick={actionMock} />}
        message="Banner message"
      />
    );

    const actionButton = getAllByRole('button', { name: 'btn label' });
    expect(actionButton[0]).toBeInTheDocument();

    actionButton[0].click();
    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it('Should be hidden after hitting close button', async () => {
    jest.useFakeTimers();

    const { getByRole, container } = render(<Banner status="info" closable message="Banner message" />);

    const closeButton = getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    closeButton.click();
    jest.advanceTimersByTime(500);
    expect(container.firstChild).toHaveClass('MuiCollapse-hidden');
  });
});
