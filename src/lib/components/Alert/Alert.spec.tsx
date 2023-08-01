import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import { Narwhal } from '../Icon/icons/functional';
import Icon from '../Icon';
import Alert from './Alert';
import type { AlertProps } from './Alert.types';

const setup = (props?: Partial<AlertProps>) => {
  return render(<Alert status="info" message="an example alert message" {...props} />);
};

describe('Alert', () => {
  it('should render correctly', () => {
    const { container } = setup();
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText(/an example alert message/i)).toBeInTheDocument();
  });

  it('should render a close button', () => {
    const onCloseMock = jest.fn();
    setup({ closable: true, onClose: onCloseMock });

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  describe('should set the correct icon', () => {
    const cases = [
      ['info', 'infoCircle.svg'],
      ['warning', 'exclamationTriangle.svg'],
      ['success', 'checkCircle.svg'],
      ['error', 'exclamationCircle.svg'],
    ];
    test.each(cases)('given %p, returns %p', (input: AlertProps['status'], expected: string) => {
      setup({ status: input });
      expect(screen.getByText(expected, { selector: 'svg' })).toBeInTheDocument();
    });
    test('custom icon', () => {
      setup({ icon: <Icon icon={Narwhal} /> });
      expect(screen.getByText('narwhal.svg', { selector: 'svg' })).toBeInTheDocument();
    });
  });
});
