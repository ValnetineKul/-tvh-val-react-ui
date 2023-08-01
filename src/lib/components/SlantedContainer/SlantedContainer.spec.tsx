import React from 'react';
import type { ComponentProps } from 'react';
import { render, screen } from '../../test-utils';
import SlantedContainer from './SlantedContainer';

type Props = ComponentProps<typeof SlantedContainer>;

describe('SlantedContainer', () => {
  it('Should render correctly', () => {
    const { baseElement } = render(<SlantedContainer>label</SlantedContainer>);
    expect(baseElement).toMatchSnapshot();
  });

  describe('Should set slant', () => {
    const cases: [Props['slant'], string][] = [
      [undefined, 'SlantedContainer-skewedStart-SlantedContainer-skewedEnd'],
      ['start', 'SlantedContainer-skewedStart'],
      ['end', 'SlantedContainer-skewedEnd'],
    ];
    it.each(cases)('given %p, returns %p', (input, expected) => {
      render(<SlantedContainer slant={input}>SlantedContainer</SlantedContainer>);
      const text = screen.getByText('SlantedContainer');
      expect(text?.parentElement?.className).toMatch(expected);
    });
  });

  describe('Should set padding', () => {
    const cases: [Props['padding'], string][] = [
      [undefined, 'SlantedContainer-paddingNone'],
      ['200', 'SlantedContainer-padding200'],
      ['300', 'SlantedContainer-padding300'],
    ];
    it.each(cases)('given %p, returns %p', (input, expected) => {
      render(<SlantedContainer padding={input}>SlantedContainer</SlantedContainer>);
      const text = screen.getByText('SlantedContainer');
      expect(text.className).toMatch(expected);
    });
  });
});
