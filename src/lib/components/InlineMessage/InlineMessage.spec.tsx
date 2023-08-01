import React from 'react';
import { render, userEvent, screen } from '../../test-utils';
import InlineMessage from './InlineMessage';

describe('InlineMessage', () => {
  it('Should render correctly', () => {
    const { container } = render(<InlineMessage status="info" message="Inline message" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set size', () => {
    const cases = [
      [undefined, 'InlineMessage-sizeMd'],
      ['sm', 'InlineMessage-sizeSm'],
      ['md', 'InlineMessage-sizeMd'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof InlineMessage>['size'], expected: string) => {
        const { container } = render(<InlineMessage size={input} message="Inline message" />);
        expect((container.firstChild as HTMLElement).className).toMatch(expected);
      }
    );
  });

  describe('Should set status', () => {
    const cases = [
      [undefined, ''],
      ['success', 'InlineMessage-statusSuccess'],
      ['warning', 'InlineMessage-statusWarning'],
      ['error', 'InlineMessage-statusError'],
      ['info', 'InlineMessage-statusInfo'],
    ];

    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof InlineMessage>['status'], expected: string) => {
        const { container } = render(<InlineMessage status={input} message="Inline message" />);
        expect((container.firstChild as HTMLElement).className).toMatch(expected);
      }
    );
  });

  describe('Should render action', () => {
    it('button', () => {
      const { getByRole } = render(<InlineMessage message="Inline message" actionLabel="Action" />);
      const button = getByRole('button', { name: 'Action' });
      expect(button).toBeInTheDocument();
      expect(button.className).toMatch('Button-variantLink');
    });

    it('link', () => {
      const { getByRole } = render(<InlineMessage message="Inline message" actionLabel="Action" href="/test" />);
      const link = getByRole('link', { name: 'Action' });
      expect(link).toBeInTheDocument();
      expect(link.className).toMatch('Button-variantLink');
    });
  });
  it('Should call onAction', () => {
    const handleAction = jest.fn();
    render(<InlineMessage message="Inline message" actionLabel="Action" onAction={handleAction} />);
    const actionButton = screen.getByRole('button', { name: 'Action' });

    expect(actionButton).toBeInTheDocument();

    userEvent.click(actionButton);

    expect(handleAction).toHaveBeenCalled();
  });

  it('Should render spinner', () => {
    const { getByRole } = render(<InlineMessage message="Inline message" status="loading" />);
    const progressbar = getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });
});
