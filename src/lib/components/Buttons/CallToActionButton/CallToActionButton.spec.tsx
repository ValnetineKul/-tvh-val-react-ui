import React from 'react';
import { Search } from '../../Icon/icons/functional';
import CallToActionButton from './CallToActionButton';
import Icon from '../../Icon';
import { render, userEvent } from '../../../test-utils';

describe('CallToActionButton', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <CallToActionButton onClick={jest.fn()} label="Label" icon={<Icon icon={Search} />} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should render correctly without label', () => {
    const { container } = render(<CallToActionButton onClick={jest.fn()} icon={<Icon icon={Search} />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should render correctly with label', () => {
    const { container } = render(<CallToActionButton onClick={jest.fn()} label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should correctly render a link', () => {
    const { container, getByRole } = render(<CallToActionButton href="#" label="Label" />);
    expect(container.firstChild).toMatchSnapshot();

    expect(getByRole('link')).toBeInTheDocument();
  });

  it('Should set disabled property', () => {
    const { container } = render(<CallToActionButton onClick={jest.fn()} disabled label="Label" />);
    expect(container.firstChild as HTMLElement).toBeDisabled();
  });

  it('Should be clickable and invoke callback function', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<CallToActionButton onClick={handleClick} icon={<Icon icon={Search} />} />);
    const button = getByRole('button');
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should render spinner', () => {
    const { getByRole } = render(<CallToActionButton onClick={jest.fn()} label="Label" isLoading />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });
});
