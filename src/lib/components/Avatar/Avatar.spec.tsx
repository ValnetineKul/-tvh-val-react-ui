import React from 'react';
import type { ComponentProps } from 'react';
import { render, screen, userEvent } from '../../test-utils';
import Avatar from './Avatar';
import testImg from './mocked-assets/image.png';
import { Building } from '../Icon/icons/functional';

type Props = ComponentProps<typeof Avatar>;

describe('Avatar', () => {
  describe('Should set Avatar size', () => {
    const cases: [Props['size'], string][] = [
      [undefined, 'Avatar-sizeSm'],
      ['xs', 'Avatar-sizeXs'],
      ['sm', 'Avatar-sizeSm'],
      ['md', 'Avatar-sizeMd'],
      ['lg', 'Avatar-sizeLg'],
    ];
    test.each(cases)('given %p, returns %p', (input, expected) => {
      render(<Avatar size={input} text="JD" />);
      const avatar = screen.getByText('JD').parentElement;
      expect(avatar?.className).toMatch(expected);
    });
  });

  it('Should render image', () => {
    render(<Avatar imageSrc={testImg} imageAlt="img" />);
    const image = screen.getByAltText('img');
    expect(image).toBeInTheDocument();
  });

  it('Should render text', () => {
    render(<Avatar text="jd" />);
    const text = screen.getByText('jd');
    expect(text).toBeInTheDocument();
  });

  it('Should render default icon', () => {
    render(<Avatar />);
    const icon = screen.getByText('user.svg');
    expect(icon).toBeInTheDocument();
  });

  it('Should render icon', () => {
    render(<Avatar icon={Building} />);
    const icon = screen.getByText('building.svg');
    expect(icon).toBeInTheDocument();
  });

  it('Should render text fallback', () => {
    render(<Avatar imageSrc="./not-available.png" imageAlt="img" text="jd" />);
    const image = screen.getByAltText('img');
    userEvent.error(image);
    const text = screen.getByText('jd');
    expect(text).toBeInTheDocument();
  });

  it('Should render default icon fallback', () => {
    render(<Avatar imageSrc="./not-available.png" imageAlt="img" />);
    const image = screen.getByAltText('img');
    userEvent.error(image);
    const icon = screen.getByText('user.svg');
    expect(icon).toBeInTheDocument();
  });

  it('Should render icon fallback', () => {
    render(<Avatar imageSrc="./not-available.png" imageAlt="img" icon={Building} />);
    const image = screen.getByAltText('img');
    userEvent.error(image);
    const icon = screen.getByText('building.svg');
    expect(icon).toBeInTheDocument();
  });
});
