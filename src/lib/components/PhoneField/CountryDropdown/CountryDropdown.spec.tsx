import React from 'react';
import { render, screen, userEvent, initResponsiveTest } from '../../../test-utils';
import type { CountryCode } from '../../../types/common';
import CountryDropdown from './CountryDropdown';

const countries: { label: string; value: CountryCode }[] = [
  { label: 'Belgium', value: 'BE' },
  { label: 'Romania', value: 'RO' },
];

const props = {
  options: countries,
  value: 'BE' as CountryCode,
  dropdownTitle: 'Country',
};

describe('CountryDropdown', () => {
  it('Should render correctly', () => {
    const handleChange = jest.fn();
    const { container } = render(<CountryDropdown {...props} onChange={handleChange} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should call on change', () => {
    initResponsiveTest('Desktop');

    const handleChange = jest.fn();
    render(<CountryDropdown {...props} onChange={handleChange} />);

    const dropdown = screen.getByRole('button');
    userEvent.click(dropdown);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    const albaniaButton = screen.getByRole('button', { name: 'Romania Romania' });
    userEvent.click(albaniaButton);

    expect(handleChange).toHaveBeenCalledWith('RO');
  });

  it('Should close when clicked again', () => {
    initResponsiveTest('Desktop');

    const handleChange = jest.fn();
    const { getByRole, queryByRole } = render(<CountryDropdown {...props} onChange={handleChange} />);

    const dropdown = getByRole('button');
    userEvent.click(dropdown);

    expect(getByRole('tooltip')).toBeInTheDocument();

    userEvent.click(dropdown);

    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('Should not render dropdown', () => {
    const handleChange = jest.fn();
    const { queryByRole } = render(<CountryDropdown {...props} onChange={handleChange} readOnly />);

    expect(queryByRole('button', { name: 'Belgium' })).not.toBeInTheDocument();
  });

  it('Should render the search results with starts with logic initially and then by contains logic and each part should be sorted alphabetically', () => {
    const options: { label: string; value: CountryCode }[] = [
      { label: 'Belgium', value: 'BE' },
      { label: 'Romania', value: 'RO' },
      { label: 'Nepal', value: 'NP' },
      { label: 'Japan', value: 'JP' },
      { label: 'Paraguay', value: 'PY' },
      { label: 'Panama', value: 'PA' },
    ];
    const handleChange = jest.fn();
    render(<CountryDropdown {...props} options={options} onChange={handleChange} />);

    const dropdown = screen.getByRole('button');
    userEvent.click(dropdown);

    const searchInput = screen.getByRole('searchbox');
    userEvent.type(searchInput, 'pa');

    const searchOptions = screen.getAllByRole('menuitem');
    expect(searchOptions).toHaveLength(4);
    expect(searchOptions[0]).toHaveTextContent('Panama');
    expect(searchOptions[1]).toHaveTextContent('Paraguay');
    expect(searchOptions[2]).toHaveTextContent('Japan');
    expect(searchOptions[3]).toHaveTextContent('Nepal');
  });
});
