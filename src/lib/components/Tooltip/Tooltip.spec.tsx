import React from 'react';
import { render, userEvent } from '../../test-utils';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('Should render correctly', () => {
    const { container } = render(<Tooltip label="Label">123</Tooltip>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show tooltip with text on hover', async () => {
    const { getByText, findByRole } = render(<Tooltip label="Label">123</Tooltip>);
    const el = getByText(/123/);
    userEvent.hover(el);
    const tooltip = await findByRole('tooltip', { name: 'Label' });
    expect(tooltip).toBeInTheDocument();
  });
  it('Should show tooltip with component on hover', async () => {
    const { getByText, findByRole } = render(<Tooltip label={<div>Component Label</div>}>123</Tooltip>);
    const el = getByText(/123/);
    userEvent.hover(el);
    const tooltip = await findByRole('tooltip', { name: 'Component Label' });
    expect(tooltip).toBeInTheDocument();
  });
});
