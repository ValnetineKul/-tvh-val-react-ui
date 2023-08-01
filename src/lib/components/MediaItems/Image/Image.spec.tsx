import React from 'react';
import { render, userEvent } from '../../../test-utils';
import filterImage from './mocked-assets/filter.jpg';
import Image from './Image';

const props = {
  src: filterImage,
  alt: 'filter',
  className: 'custom-class',
};

describe('Image', () => {
  it('Should render correctly with image', () => {
    const { getByRole } = render(<Image {...props} />);
    expect(getByRole('img', { name: props.alt })).toBeInTheDocument();
  });
  it('Should have className', () => {
    const { getByRole } = render(<Image {...props} />);
    expect((getByRole('img', { name: props.alt }) as HTMLElement).className).toMatch('custom-class');
  });
  it('Should render placeholder on image error', async () => {
    const { findByRole, getByRole } = render(<Image {...props} />);
    const image = await findByRole('img', { name: 'filter' });
    userEvent.error(image);
    const placeholder = getByRole('img', { name: '' });
    expect(placeholder).toBeInTheDocument();
  });
  it('Should render fallback text on image error', async () => {
    const { findByRole, findByText } = render(<Image {...props} fallback="text" />);
    const image = await findByRole('img', { name: 'filter' });
    userEvent.error(image);
    const fallback = await findByText('filter');
    expect(fallback).toBeInTheDocument();
    expect(fallback.className).toMatch('Typography');
  });
  describe('Should render placeholder when image src is undefined or null', () => {
    const cases = [undefined, null];
    test.each(cases)('given %p', (input: React.ComponentProps<typeof Image>['src']) => {
      const { queryByAltText, getByRole } = render(<Image src={input} alt="Some title" fallback="image" />);
      expect(queryByAltText('Some title')).not.toBeInTheDocument();
      const placeholder = getByRole('img', { name: '' });
      expect(placeholder).toBeInTheDocument();
    });
  });
  describe('Should render fallback text when image src is undefined or null', () => {
    const cases = [undefined, null];
    test.each(cases)('given %p', (input: React.ComponentProps<typeof Image>['src']) => {
      const { getByText, queryByRole } = render(<Image src={input} alt="Some title" fallback="text" />);
      expect(getByText('Some title')).toBeInTheDocument();
      const placeholder = queryByRole('img');
      expect(placeholder).not.toBeInTheDocument();
    });
  });
});
