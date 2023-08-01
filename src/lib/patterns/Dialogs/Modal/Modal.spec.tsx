import React from 'react';
import { screen, userEvent, render, initResponsiveTest } from '../../../test-utils';
import Button from '../../../components/Buttons/Button';
import Modal from './Modal';

const props = {
  open: true,
  id: 'dialog-title',
  title: 'Dialog header',
};

describe('Dialog', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should render correctly', () => {
    const { baseElement } = render(<Modal size="sm" {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Should callback on header close button click', () => {
    const onClose = jest.fn();
    render(<Modal size="sm" onClose={onClose} {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should not render header close button if there is no onClose prop (close button is optional)', () => {
    render(<Modal size="sm" {...props} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  describe('Should set modal body size', () => {
    it('Should set full screen modal body on mobile', () => {
      initResponsiveTest('Mobile');

      render(<Modal {...props} />);
      expect(screen.getByRole('dialog').className).toMatch('MuiDialog-paperFullScreen');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeLg');
    });

    it('Should set "sm" modal body on tablet', () => {
      initResponsiveTest('Tablet');

      render(<Modal size="sm" {...props} />);
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeLg');
    });

    it('Should set "sm" modal body on desktop', () => {
      initResponsiveTest('Desktop');

      render(<Modal size="sm" {...props} />);
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeLg');
    });

    it('Should not set "md" modal body on tablet', () => {
      initResponsiveTest('Tablet');

      render(<Modal size="md" {...props} />);
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeLg');
    });

    it('Should set "md" modal body on desktop', () => {
      initResponsiveTest('Desktop');

      render(<Modal size="md" {...props} />);
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeMd');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeLg');
    });

    it('Should set "lg" modal body on tablet', () => {
      initResponsiveTest('Tablet');

      render(<Modal size="lg" {...props} />);
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeLg');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
    });

    it('Should set "lg" modal body on desktop', () => {
      initResponsiveTest('Desktop');

      render(<Modal size="lg" {...props} />);
      expect(screen.getByRole('dialog')?.className).toMatch('Modal-sizeLg');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeSm');
      expect(screen.queryByRole('dialog')?.className).not.toMatch('Modal-sizeMd');
    });
  });
  it('Should render custom title', () => {
    const args = {
      ...props,
      title: <Button label="Custom title" />,
    };
    render(<Modal {...args} />);
    const title = screen.getByRole('button', { name: 'Custom title' });
    expect(title).toBeInTheDocument();
  });
});
