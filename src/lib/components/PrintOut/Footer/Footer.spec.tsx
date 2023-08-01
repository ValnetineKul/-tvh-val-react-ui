import React from 'react';
import { render, screen } from '../../../test-utils';
import Footer from './Footer';

describe('Footer', () => {
  it('Should render logo', () => {
    render(<Footer />);
    const image = screen.getByAltText('Logo');
    expect(image).toBeInTheDocument();
  });

  it('Should render custom alt text', () => {
    const alt = 'Custom alt text';
    render(<Footer alt={alt} />);
    const image = screen.getByAltText(alt);
    expect(image).toBeInTheDocument();
  });

  it('Should render custom text', () => {
    const text = 'www.test.com';
    render(<Footer text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
