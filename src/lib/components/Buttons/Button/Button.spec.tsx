import React from 'react';
import { Link } from 'react-router-dom';
import { userEvent, render, screen } from '../../../test-utils';
import { AngleRight, AngleLeft } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Button from './Button';

describe('Button', () => {
  it('Should render correctly', () => {
    const { container } = render(<Button variant="primary" label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set button size', () => {
    const cases = [
      [undefined, 'Button-sizeMd'],
      ['sm', 'Button-sizeSm'],
      ['md', 'Button-sizeMd'],
      ['lg', 'Button-sizeLg'],
    ];
    test.each(cases)('given %p, returns %p', (input: React.ComponentProps<typeof Button>['size'], expected: string) => {
      const { getByRole } = render(<Button size={input} variant="primary" label="Label" />);
      const button = getByRole('button', { name: 'Label' });
      expect(button.className).toMatch(expected);
    });
  });

  it('Should disable button if disabled prop is true', () => {
    const { getByRole } = render(<Button variant="primary" label="Label" disabled />);
    const button = getByRole('button', { name: 'Label' });
    expect(button).toBeDisabled();
    expect(button.className).toMatch('Mui-disabled');
  });

  it('Should callback on button click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} variant="primary" label="Label" />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should render start icon', () => {
    render(<Button startIcon={<Icon icon={AngleLeft} title="start" />} variant="primary" label="Label" />);
    expect(screen.getByText('angleLeft.svg')).toBeInTheDocument();
  });

  it('Should render end icon', () => {
    render(<Button startIcon={<Icon icon={AngleRight} title="end" />} variant="primary" label="Label" />);
    expect(screen.getByText('angleRight.svg')).toBeInTheDocument();
  });

  it('Should render HTML link tag "a" if "href" prop is filled', () => {
    render(<Button variant="link" label="Label" href="/href" />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Should render Link from "react-router-dom" library if "to" prop is filled', () => {
    render(<Button variant="link" label="Label" component={Link} to="/to" />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Should render spinner', () => {
    const { getByRole } = render(<Button variant="primary" label="Label" isLoading />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('Should not render spinner if button is link', () => {
    const { queryByRole } = render(<Button variant="primary" label="Label" isLoading href="/" />);
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
  });

  describe('Should set link type if button variant is"link"', () => {
    const cases = [
      [undefined, 'Button-linkTypeDefault'],
      ['default', 'Button-linkTypeDefault'],
      ['primary', 'Button-linkTypePrimary'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof Button>['linkType'], expected: string) => {
        const { getByRole } = render(<Button linkType={input} variant="link" label="Label" />);
        const button = getByRole('button', { name: 'Label' });
        expect(button.className).toMatch(expected);
      }
    );
  });

  it('Should set data attributes', () => {
    const { getByRole } = render(<Button label="Label" data-testid="test-label" />);
    const button = getByRole('button', { name: 'Label' });
    expect(button).toHaveAttribute('data-testid', 'test-label');
  });
});
