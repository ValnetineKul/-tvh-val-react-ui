import React from 'react';
import { render, screen } from '../../../test-utils';
import BreadcrumbItem from './BreadcrumbItem';

describe('BreadcrumbItem', () => {
  it('Should render correctly', () => {
    const { container } = render(<BreadcrumbItem label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should trigger onClick', () => {
    const handleClick = jest.fn();
    render(<BreadcrumbItem label="Label" url="/" onClick={handleClick} />);
    const breadcrumbItemLink = screen.getByRole('link', { name: 'Label' });
    breadcrumbItemLink.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('Should not be button/link if currentPage', () => {
    render(<BreadcrumbItem label="Label" currentPage />);
    expect(screen.getByText('Label', { selector: 'span' })).toBeInTheDocument();
  });
});
