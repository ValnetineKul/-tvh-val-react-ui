import React from 'react';
import useBackToTop from './useBackToTop';
import { render, userEvent } from '../../../test-utils';
import BackToTopButton from './BackToTopButton';

jest.mock('./useBackToTop');

describe('BackToTopButton', () => {
  it('Should render correctly', () => {
    (useBackToTop as jest.Mock).mockReturnValue(true);
    const { container } = render(<BackToTopButton />);
    expect(container).toMatchSnapshot();
  });

  it('Should get callback on click', () => {
    (useBackToTop as jest.Mock).mockReturnValue(true);
    window.scrollTo = jest.fn();
    const { getByRole } = render(<BackToTopButton />);
    const button = getByRole('button');
    userEvent.click(button);
    expect(window.scrollTo).toBeCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('Should not render if not needed', () => {
    (useBackToTop as jest.Mock).mockReturnValue(false);
    const { queryByRole } = render(<BackToTopButton />);
    const button = queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
