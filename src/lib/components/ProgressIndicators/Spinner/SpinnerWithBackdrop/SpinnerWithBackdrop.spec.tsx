import React from 'react';
import { render, screen } from '../../../../test-utils';
import SpinnerWithBackdrop from './SpinnerWithBackdrop';

describe('SpinnerWithBackdrop', () => {
  it('Should show Spinner if it is loading', async () => {
    render(<SpinnerWithBackdrop isLoading>some text</SpinnerWithBackdrop>);
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });

  it('Should NOT show Spinner if it is not loading', () => {
    render(<SpinnerWithBackdrop isLoading={false}>some text</SpinnerWithBackdrop>);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
