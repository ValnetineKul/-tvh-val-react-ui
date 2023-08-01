import React from 'react';
import { render, screen, initResponsiveTest, userEvent } from '../../test-utils';
import LimitedText from './LimitedText';

const longText =
  'The default maximum amount of characters is 30 (including spaces) on tablet and desktop. When the label is longer than that, it will be truncated and a Tooltip will be shown on hover';
const limitedText = 'The default maximum amount of…';

describe('LimitedText', () => {
  it('Should show full text on mobile', () => {
    render(<LimitedText text={longText} />);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('Should not show tooltip on mobile', () => {
    render(<LimitedText text={longText} />);

    const text = screen.getByText(longText);
    userEvent.hover(text);

    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('Should trancate text on tablet and desktop', () => {
    initResponsiveTest('Tablet');
    render(<LimitedText text={longText} />);
    const trancatedText = screen.getByText(limitedText);
    expect(trancatedText).toBeInTheDocument();
  });

  it('Should show tooltip on tablet and desktop', async () => {
    initResponsiveTest('Tablet');
    render(<LimitedText text={longText} />);

    const text = screen.getByText(limitedText);
    userEvent.hover(text);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
