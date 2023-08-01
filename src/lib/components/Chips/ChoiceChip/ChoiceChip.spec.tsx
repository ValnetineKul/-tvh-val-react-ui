import React from 'react';
import { Link } from 'react-router-dom';
import { userEvent, render } from '../../../test-utils';
import ChoiceChip from './ChoiceChip';

const props = {
  label: 'Label',
  title: 'Title',
  image: 'image.png',
};
describe('ChoiceChip', () => {
  it('Should render correctly', () => {
    const { container } = render(<ChoiceChip {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have no padding on image part', () => {
    const { getByAltText } = render(<ChoiceChip {...props} imagePadding={false} />);
    expect((getByAltText('').parentElement as HTMLElement).className).not.toMatch('ImagePadding');
  });

  it('should have classes for: img + title + label', () => {
    const { container } = render(<ChoiceChip {...props} />);
    expect((container.firstChild as HTMLElement).className).toMatch('hasTwoColumns');
    expect((container.firstChild as HTMLElement).className).toMatch('hasTitleAndLabel');
  });

  it('should have correct classes for: label', () => {
    const { container } = render(<ChoiceChip label="label" />);
    expect((container.firstChild as HTMLElement).className).not.toMatch('hasTwoColumns');
    expect((container.firstChild as HTMLElement).className).not.toMatch('hasTitleAndLabel');
  });

  it('should have fullWidth applied', () => {
    const { container } = render(<ChoiceChip {...props} fullWidth />);
    expect((container.firstChild as HTMLElement).className).toMatch('fullWidth');
  });

  it('Should disable button if disabled prop is true', () => {
    const { container } = render(<ChoiceChip {...props} disabled />);
    expect(container.firstChild as HTMLElement).toBeDisabled();
    expect((container.firstChild as HTMLElement).className).toMatch('Mui-disabled');
  });

  it('Should trigger on button click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<ChoiceChip {...props} onClick={onClick} />);
    const button = getByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should render HTML link tag "a" if "href" prop is filled', () => {
    const { getByRole } = render(<ChoiceChip {...props} href="/href" />);
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('Should render Link from "react-router-dom" library if "to" prop is filled', () => {
    const { getByRole } = render(<ChoiceChip {...props} component={Link} to="/to" />);
    expect(getByRole('link')).toBeInTheDocument();
  });
});
