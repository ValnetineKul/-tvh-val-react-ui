import React from 'react';
import { Link } from 'react-router-dom';
import { render, userEvent, screen } from '../../../../test-utils';
import StepButton from './StepButton';

describe('StepButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<StepButton label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should disable button if disabled prop is true', () => {
    render(<StepButton label="Label" disabled />);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeDisabled();
    expect(button.className).toMatch('Mui-disabled');
  });

  it('Should callback on button click', () => {
    const onClick = jest.fn();
    render(<StepButton label="Label" onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Label' });
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should render HTML link tag "a" if "href" prop is filled', () => {
    render(<StepButton label="Label" href="/href" />);
    expect(screen.getByRole('link', { name: 'Label' })).toBeInTheDocument();
  });

  it('Should render Link from "react-router-dom" library if "to" prop is filled', () => {
    render(<StepButton label="Label" component={Link} to="/to" />);
    expect(screen.getByRole('link', { name: 'Label' })).toBeInTheDocument();
  });

  it('Should hide label if hiddenLabel prop is true', () => {
    render(<StepButton hiddenLabel label="Label" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });
});
