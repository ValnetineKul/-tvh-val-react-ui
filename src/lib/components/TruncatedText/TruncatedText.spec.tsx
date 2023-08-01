import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import TruncatedText from './TruncatedText';

const longText = 'long long long long text';
describe('TruncatedText', () => {
  it('should truncate long text', () => {
    const { getByText } = render(<TruncatedText text={longText}>{longText}</TruncatedText>);
    const context = getByText(longText);
    expect(context.className.includes('truncatedText')).toBe(true);
  });
  it('should show tooltip', async () => {
    const { rerender, container } = render(<TruncatedText text="Long label" />);
    expect(container.querySelector('[role="tooltip"]')).toBeNull();

    const text = screen.getByText('Long label');

    Object.defineProperties(text, {
      scrollWidth: { configurable: true, value: 144 },
      offsetWidth: { configurable: true, value: 40 },
    });

    rerender(<TruncatedText text="Long long label" />);

    const text1 = screen.getByText('Long long label');
    userEvent.hover(text1);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
