import React from 'react';
import { render } from '../../../test-utils';
import Autocomplete from './Autocomplete';

const options = [
  {
    label: 'option 1',
    value: 'value 1',
  },
  {
    label: 'option 2',
    value: 'value 2',
  },
  {
    label: 'option 3',
    value: 'value 3',
  },
  {
    label: 'option 4',
    value: 'value 4',
  },
];

const props = {
  label: 'Label',
  id: 'select-id',
  options,
  value: null,
  isOpen: false,
  multiple: false,
  isEachOptionSelected: false,
  onChange: jest.fn(),
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onClear: jest.fn(),
  getOptionLabel: jest.fn(),
  renderOption: jest.fn(),
  filterOptions: jest.fn(),
};

describe('Autocomplete', () => {
  it('Should render correctly', () => {
    const { container } = render(<Autocomplete {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
