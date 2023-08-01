import React from 'react';
import { render, userEvent, screen, initResponsiveTest, waitFor } from '../../test-utils';
import type { CountryItem } from '../CountrySelect';

import Select, { FreeSoloCreatableOptionValue } from './Select';

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

const groupedOptions = {
  'Recent makes': [
    { label: 'TVH', value: 'value 1' },
    { label: 'CVH', value: 'value 2' },
  ],
  'More makes': [
    { label: 'Make 1', value: 'value 3' },
    { label: 'Make 2', value: 'value 4' },
    { label: 'Make CVH', value: 'value 5' },
  ],
};

const countries: CountryItem[] = [
  { code: 'BE', name: 'Belgium' },
  { code: 'RU', name: 'Russia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'BY', name: 'Belarus' },
];

const multiParamOptions = [
  { label: 'option 1', additionalParam: 'additionalParam 1', value: 'value 1' },
  { label: 'option 2', additionalParam: 'additionalParam 2', value: 'value 2' },
  { label: 'option 3', additionalParam: 'additionalParam 3', value: 'value 3' },
];

const props = {
  label: 'Label',
  id: 'select-id',
  options,
  getOptionLabel: (option: { label: string; value: string }) => option.label,
  value: null,
  onChange: jest.fn(),
  onClose: jest.fn(),
};

describe('Select', () => {
  it('Should show label assigned to the input', () => {
    const { container } = render(<Select {...props} />);
    const label = container.querySelector('label');
    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('Should not change value on typing when search is disabled', () => {
    render(<Select {...props} searchable={false} />);
    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    input.focus();

    userEvent.type(input, '1234');
    expect(input).toHaveValue('');
  });

  describe('Should show the list of options (desktop/tablet view)', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });

    it('on input focus', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} />);
      const autocomplete = getByRole('combobox');
      const input = getByLabelText('Label', { selector: 'input', exact: false });

      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
      input.focus();
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');

      expect(getByRole('listbox', { name: 'Label' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 2' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 3' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 4' })).toBeInTheDocument();
    });

    it('on arrow button click', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} />);
      const autocomplete = getByRole('combobox');
      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });

      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
      userEvent.click(arrowButton);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');

      expect(getByRole('listbox', { name: 'Label' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 2' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 3' })).toBeInTheDocument();
      expect(getByRole('option', { name: 'option 4' })).toBeInTheDocument();
    });
  });

  describe('Should close the list of options (desktop/tablet view)', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });

    it('on toggle input', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} />);
      const autocomplete = getByRole('combobox');
      const input = getByLabelText('Label', { selector: 'input', exact: false });

      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
      userEvent.click(input);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');
      userEvent.click(input);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
    });

    it('on arrow button click', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} />);
      const autocomplete = getByRole('combobox');
      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });

      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
      userEvent.click(arrowButton);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');
      userEvent.click(arrowButton);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
    });

    it('on outside select component click', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} />);
      const autocomplete = getByRole('combobox');
      const input = getByLabelText('Label', { selector: 'input', exact: false });

      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
      input.focus();
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');
      input.blur();
      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Should filter options', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('should filter valid value', () => {
      const { getByRole, getAllByRole, getByLabelText } = render(<Select {...props} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, '1');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
    });

    it('should filter value with trim whitespace from the start', () => {
      const { getByRole, getAllByRole, getByLabelText } = render(<Select {...props} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, '     option 1');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
    });

    it('should filter value with trim whitespace from the end', () => {
      const { getByRole, getAllByRole, getByLabelText } = render(<Select {...props} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, 'option 1     ');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
    });
  });

  describe('Should use search logic (starts with & contains)', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('Should sort countries that start with the typed value and after that the countries that contains the value. Countries should be displayed alphabetically.', () => {
      const { getAllByRole, getByLabelText } = render(
        <Select
          {...props}
          options={countries}
          getOptionLabel={(option: { code: string; name: string }) => option.name}
        />
      );
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, 'rus');
      const sortedCountries = getAllByRole('option');
      expect(sortedCountries).toHaveLength(3);
      expect(sortedCountries[0].textContent).toBe('Russia');
      expect(sortedCountries[1].textContent).toBe('Belarus');
      expect(sortedCountries[2].textContent).toBe('Cyprus');
    });

    it('Should sort grouped options in each group (firstly the startsWith logic and secondly the contains logic). Items should be displayed alphabetically.', () => {
      const { getByText, getAllByRole, getByLabelText } = render(<Select {...props} options={groupedOptions} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, 'vh');
      const sortedItems = getAllByRole('option');
      expect(sortedItems).toHaveLength(3);
      expect(getByText('Recent makes', { selector: 'span' })).toBeInTheDocument();
      expect(sortedItems[0].textContent).toBe('CVH');
      expect(sortedItems[1].textContent).toBe('TVH');
      expect(getByText('More makes', { selector: 'span' })).toBeInTheDocument();
      expect(sortedItems[2].textContent).toBe('Make CVH');
    });
  });

  it('Should hide Select All option when input is not empty', () => {
    const { getByLabelText, queryByLabelText } = render(
      <Select {...props} value={[]} multiple onSelectAll={() => {}} />
    );
    const input = getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(input, '1');
    const selectAllCheckbox = queryByLabelText('Select all', { selector: 'input' });
    expect(selectAllCheckbox).not.toBeInTheDocument();
  });

  it('Should hide title of group with no matching options', () => {
    const { getByLabelText, queryByText } = render(<Select {...props} options={groupedOptions} />);
    const input = getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(input, 'make');
    expect(queryByText('Recent makes', { selector: 'span' })).not.toBeInTheDocument();
  });

  describe('Should trigger onChange', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('for a single value', () => {
      let value: { label: string; value: string } | null = null;

      const { getByRole, getByLabelText } = render(
        <Select
          {...props}
          onChange={(e, v) => {
            value = v;
          }}
        />
      );
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      input.focus();

      const option = getByRole('option', { name: /option 1/ });
      userEvent.click(option);
      expect(value).toEqual({ label: 'option 1', value: 'value 1' });
    });

    it('for a multiple value', () => {
      let value: { label: string; value: string }[] = [];

      const { getByRole, getByLabelText } = render(
        <Select
          {...props}
          value={[]}
          multiple
          onChange={(e, v) => {
            value = v;
          }}
        />
      );
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      input.focus();

      const option = getByRole('option', { name: /option 2/ });
      userEvent.click(option);
      expect(value).toEqual([{ label: 'option 2', value: 'value 2' }]);
    });
  });

  describe('Should show selected value', () => {
    it('for a single value', () => {
      const { getByLabelText } = render(<Select {...props} value={options[0]} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      expect(input).toHaveValue('option 1');
    });

    it('for a multiple value (1 option selected)', () => {
      const { getByText } = render(<Select {...props} value={[options[0]]} multiple />);
      expect(getByText('option 1')).toBeInTheDocument();
    });
    it('for a multiple value (several options selected)', () => {
      const { getByText } = render(<Select {...props} value={[options[0], options[1]]} multiple />);
      expect(getByText('2 selected')).toBeInTheDocument();
    });

    it('for a multiple value (all selected)', () => {
      const { getByText } = render(<Select {...props} value={options} multiple />);
      expect(getByText('All selected')).toBeInTheDocument();
    });
  });

  it('Should show no results message', () => {
    initResponsiveTest('Tablet');

    const { getByLabelText, queryByRole, getByText } = render(<Select {...props} options={[]} />);
    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    expect(getByText('No results')).toBeInTheDocument();
    expect(queryByRole('listbox', { name: 'Label' })).not.toBeInTheDocument();
  });

  it('Should remove option on backspace press', () => {
    initResponsiveTest('Tablet');
    let value: { label: string; value: string }[] = [options[0], options[1]];
    const { getByLabelText } = render(
      <Select
        {...props}
        value={value}
        multiple
        onChange={(e, v) => {
          value = v;
        }}
      />
    );
    const input = getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(input, '{backspace}');
    expect(value).toEqual([options[0]]);
  });

  it('Clear button should not be present', () => {
    let value: { label: string; value: string } | null = options[0];
    const { queryByLabelText } = render(
      <Select
        {...props}
        clearable={false}
        value={value}
        onChange={(e, v) => {
          value = v;
        }}
      />
    );
    const clearButton = queryByLabelText('Clear value', { selector: 'button' });
    expect(clearButton).not.toBeInTheDocument();
  });

  describe('Should clear the value', () => {
    it('for single', () => {
      let value: { label: string; value: string } | null = options[0];
      const { getByLabelText } = render(
        <Select
          {...props}
          value={value}
          onChange={(e, v) => {
            value = v;
          }}
        />
      );
      const clearButton = getByLabelText('Clear value', { selector: 'button' });
      userEvent.click(clearButton);
      expect(value).toEqual(null);
    });

    it('for multiple', () => {
      let value: { label: string; value: string }[] = [options[0], options[1]];
      const { getByLabelText } = render(
        <Select
          {...props}
          value={value}
          multiple
          onChange={(e, v) => {
            value = v;
          }}
        />
      );
      const clearButton = getByLabelText('Clear value', { selector: 'button' });
      userEvent.click(clearButton);
      expect(value).toEqual([]);
    });

    it('Should clear select by setting empty value', () => {
      const { rerender } = render(<Select {...props} value={options[0]} />);
      expect(screen.getByDisplayValue('option 1')).toBeInTheDocument();
      rerender(<Select {...props} value={null} />);
      expect(screen.queryByDisplayValue('option 1')).not.toBeInTheDocument();
    });
  });

  describe('Should select all options (desktop/tablet view)', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('Should show select all checkbox with a default "Select all" label', () => {
      const onSelectAll = jest.fn();
      const { getByLabelText } = render(<Select {...props} value={[options[0]]} multiple onSelectAll={onSelectAll} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      input.focus();
      const selectAllCheckbox = getByLabelText('Select all', { selector: 'input', exact: false });
      expect(selectAllCheckbox).toBeInTheDocument();
    });

    it('Should set label if there is selectAllLabel', () => {
      const onSelectAll = jest.fn();
      const { getByLabelText } = render(
        <Select {...props} value={[options[0]]} multiple selectAllLabel="Test label" onSelectAll={onSelectAll} />
      );
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      input.focus();
      const selectAllCheckbox = getByLabelText('Test label', { selector: 'input', exact: false });
      expect(selectAllCheckbox).toBeInTheDocument();
    });

    it('Should show select all option (checkbox indeterminate) in the list of options', () => {
      const onSelectAll = jest.fn();
      const { getByLabelText } = render(<Select {...props} value={[options[0]]} multiple onSelectAll={onSelectAll} />);
      const input = getByLabelText('Label', { selector: 'input', exact: false });
      input.focus();

      const selectAllCheckbox = getByLabelText('Select all', { selector: 'input', exact: false });
      expect(selectAllCheckbox).toBeInTheDocument();
      expect(selectAllCheckbox).toHaveAttribute('data-indeterminate', 'true');
    });

    it('Should select all options in the list of options if select all option is selected', () => {
      let value: { label: string; value: string }[] = [];
      const { getByRole, getByLabelText } = render(
        <Select
          {...props}
          value={[]}
          multiple
          onSelectAll={() => {
            value = options;
          }}
        />
      );
      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
      userEvent.click(arrowButton);

      const option = getByRole('option', { name: /Select all/ });
      userEvent.click(option);
      expect(value).toEqual([
        { label: 'option 1', value: 'value 1' },
        { label: 'option 2', value: 'value 2' },
        { label: 'option 3', value: 'value 3' },
        { label: 'option 4', value: 'value 4' },
      ]);
    });

    it('Should not select all options in the list of options if select all option is not selected', () => {
      let value: { label: string; value: string }[] = [];
      const { getByRole, getByLabelText } = render(
        <Select
          {...props}
          value={options}
          multiple
          onSelectAll={() => {
            value = [];
          }}
        />
      );
      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
      userEvent.click(arrowButton);

      const option = getByRole('option', { name: /Select all/ });
      userEvent.click(option);
      expect(value).toEqual([]);
    });
  });

  it('Should correctly pickup popper className', () => {
    initResponsiveTest('Tablet');
    const { getByRole, getByLabelText } = render(<Select {...props} popperProps={{ className: 'popperClassName' }} />);
    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    const popperComponent = getByRole('presentation');
    expect(popperComponent.className).toMatch('popperClassName');
  });

  it('Should maintain the custom options', () => {
    initResponsiveTest('Tablet');
    const { getByRole, getByText, getByLabelText } = render(
      <Select {...props} renderOption={(_, option) => <li key={option.value}>{option.label}</li>} />
    );
    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    expect(getByRole('listbox', { name: 'Label' })).toBeInTheDocument();
    expect(getByText('option 1', { selector: 'div' })).toBeInTheDocument();
    expect(getByText('option 2', { selector: 'div' })).toBeInTheDocument();
    expect(getByText('option 3', { selector: 'div' })).toBeInTheDocument();
    expect(getByText('option 4', { selector: 'div' })).toBeInTheDocument();
  });

  it('Should correctly compare values by isOptionEqualToValue callback', () => {
    initResponsiveTest('Tablet');
    let value: { label: string; value: string } | null = null;

    const { getByRole, getByLabelText } = render(
      <Select
        {...props}
        onChange={(_, newVal) => {
          value = newVal;
        }}
        isOptionEqualToValue={(o, v) => {
          return o.value === v.value;
        }}
      />
    );
    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    const option = getByRole('option', { name: 'option 1' });
    userEvent.click(option);
    expect(value).toEqual({ label: 'option 1', value: 'value 1' });
  });

  it('Should show info message banner', () => {
    initResponsiveTest('Tablet');
    const infoMessage = 'some info message';
    const { getByLabelText, getByText } = render(<Select {...props} infoMessage={infoMessage} />);
    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    expect(getByText(infoMessage)).toBeInTheDocument();
  });

  it('Should show grouped options ', () => {
    initResponsiveTest('Tablet');
    const { getByRole, getByText, getByLabelText } = render(<Select {...props} options={groupedOptions} />);
    const input = getByLabelText('Label', { selector: 'input', exact: false });

    input.focus();

    expect(getByRole('listbox', { name: 'Label' })).toBeInTheDocument();
    expect(getByText('Recent makes', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('TVH', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('CVH', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('More makes', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('Make 1', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('Make 2', { selector: 'span' })).toBeInTheDocument();
    expect(getByText('Make CVH', { selector: 'span' })).toBeInTheDocument();
  });

  describe('Should close dropdown after selecting option (desktop/tablet view)', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('Should show all options after searching, selection, closing and reopening dropdown', () => {
      let value: { label: string; value: string } | null = null;

      const { getByRole, getAllByRole, getByLabelText } = render(
        <Select
          {...props}
          onChange={(e, v) => {
            value = v;
          }}
        />
      );

      const input = getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(input, '1');
      expect(getAllByRole('option')).toHaveLength(1);
      expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();

      const option = getByRole('option', { name: /option 1/ });
      userEvent.click(option);
      expect(value).toEqual({ label: 'option 1', value: 'value 1' });

      const autocomplete = getByRole('combobox');
      expect(autocomplete).toHaveAttribute('aria-expanded', 'false');

      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
      userEvent.click(arrowButton);
      expect(autocomplete).toHaveAttribute('aria-expanded', 'true');
      expect(getAllByRole('option')).toHaveLength(4);
    });
  });

  describe('Should show loading', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('Should show loading', () => {
      const { getByRole, getByLabelText } = render(<Select {...props} loading />);

      const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
      userEvent.click(arrowButton);

      const spinner = getByRole('progressbar');
      expect(spinner).toBeInTheDocument();
    });
  });

  it('Should contain a multi select button to confirm that the value(s) will be saved in mobile view', () => {
    initResponsiveTest('Mobile');
    const { getByLabelText, getByText } = render(
      <Select {...props} multiple value={options} modalActionItemLabel="Done label" />
    );

    const arrowButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(arrowButton);

    const multiSelectButton = getByText('Done label', { selector: 'button' });
    expect(multiSelectButton).toBeInTheDocument();
  });

  describe('FreeSolo (only for single select)', () => {
    it('Should allow type any text in autocomplete input and not show "No result" message', () => {
      initResponsiveTest('Tablet');
      render(<Select {...props} freeSolo options={props.options.map((o) => o.value)} getOptionLabel={(v) => v} />);

      const searchInput = screen.getByLabelText('Label', { exact: false });
      userEvent.type(searchInput, 'abc');

      expect(screen.queryByText('No results')).not.toBeInTheDocument();
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('Should keep input text on outside autocomplete input click', () => {
      initResponsiveTest('Tablet');
      render(<Select {...props} freeSolo options={props.options.map((o) => o.value)} getOptionLabel={(v) => v} />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'abc');

      searchInput.blur();
      expect(screen.getByLabelText('Label', { selector: 'input' })).toHaveValue('abc');
    });

    it('Should trigger onChange with a new value when onEnter click (desktop/tablet view)', () => {
      initResponsiveTest('Tablet');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'testValue');
      userEvent.keyboard('{enter}');
      expect(handleChange).toHaveBeenCalledWith('testValue');
    });

    it('Should not trigger onChange with a new value on outside autocomplete input click (desktop/tablet view)', () => {
      initResponsiveTest('Tablet');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'testValue');
      searchInput.blur();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('Should trigger onChange with a new value on outside autocomplete input click if "autoSelect" is true (desktop/tablet view)', () => {
      initResponsiveTest('Tablet');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
          autoSelect
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'testValue');
      searchInput.blur();
      expect(handleChange).toHaveBeenCalledWith('testValue');
    });

    it('Should trigger onChange with a new value when click on `Select "inputValue"` button (mobile view)', async () => {
      initResponsiveTest('Mobile');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      );
      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.click(searchInput);

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
      });

      const autocomplete = screen.getByRole('textbox');
      userEvent.type(autocomplete, 'op');
      expect(screen.getAllByRole('option')).toHaveLength(4);

      const saveFreeSoloButton = screen.getByRole('button', { name: 'Select "op"' });
      userEvent.click(saveFreeSoloButton);

      expect(handleChange).toHaveBeenCalledWith('op');
    });

    it('Should not show `Select "inputValue"` button if an option with the same inputValue exists in the dropdown (mobile view)', async () => {
      initResponsiveTest('Mobile');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      );
      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.click(searchInput);

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
      });

      const autocomplete = screen.getByRole('textbox');
      userEvent.type(autocomplete, 'option 1');
      expect(screen.getAllByRole('option')).toHaveLength(1);
      expect(screen.queryByRole('button', { name: 'Select "option 1"' })).not.toBeInTheDocument();
    });

    it('Should reset input field freeSolo value for single value (mobile view)', () => {
      initResponsiveTest('Mobile');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSolo
          value={options[0].label}
          onChange={(e, v) => handleChange(v)}
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
        />
      );
      expect(screen.getByLabelText('Label', { selector: 'input', exact: false })).toHaveValue('option 1');

      const clearButton = screen.getByLabelText('Clear value', { selector: 'button' });
      expect(clearButton).toBeInTheDocument();
      userEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith(null);

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      const autocomplete = screen.getByRole('textbox');
      expect(autocomplete).toHaveValue('');
    });

    describe('Should clear the autocomplete input', () => {
      it('no value is set', () => {
        initResponsiveTest('Tablet');
        render(
          <Select
            {...props}
            freeSolo
            options={options.map((option) => option.label)}
            getOptionLabel={(option) => option}
          />
        );

        const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
        expect(searchInput).toHaveValue('');
        expect(screen.queryByLabelText('Clear value', { selector: 'button' })).not.toBeInTheDocument();

        userEvent.type(searchInput, 'abc');
        expect(searchInput).toHaveValue('abc');

        const clearButton = screen.getByLabelText('Clear value', { selector: 'button' });
        expect(clearButton).toBeInTheDocument();

        userEvent.click(clearButton);
        expect(searchInput).toHaveValue('');
      });
    });

    it('value is set', () => {
      initResponsiveTest('Tablet');
      render(
        <Select
          {...props}
          freeSolo
          options={options.map((option) => option.label)}
          getOptionLabel={(option) => option}
          value={options[0].label}
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      expect(searchInput).toHaveValue('option 1');

      const clearButton = screen.getByLabelText('Clear value', { selector: 'button' });
      expect(clearButton).toBeInTheDocument();

      userEvent.type(searchInput, 'abc');
      expect(searchInput).toHaveValue('abc');

      userEvent.click(clearButton);
      expect(searchInput).toHaveValue('');
    });
  });
});

describe('FreeSolo Creatable (only for single select)', () => {
  it('Should create option in the select dropdown', () => {
    initResponsiveTest('Tablet');
    render(<Select {...props} freeSoloCreatable />);

    const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(searchInput, 'abc');

    expect(screen.queryByText('No results')).not.toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Add "abc"' })).toBeInTheDocument();
  });

  describe('Should not save input text on outside select component click', () => {
    it('if value is not set (empty input)', () => {
      initResponsiveTest('Tablet');
      render(<Select {...props} freeSoloCreatable />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      expect(searchInput).toHaveValue('');

      userEvent.type(searchInput, 'abc');
      expect(searchInput).toHaveValue('abc');

      searchInput.blur();
      expect(searchInput).toHaveValue('');
    });

    it('if value is set (input has selected option)', () => {
      initResponsiveTest('Tablet');
      render(<Select {...props} freeSoloCreatable value={options[0]} />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      expect(searchInput).toHaveValue('option 1');

      userEvent.type(searchInput, 'abc');
      expect(searchInput).toHaveValue('abc');

      searchInput.blur();
      expect(searchInput).toHaveValue('option 1');
    });

    it('Should trigger onChange with a new value when onEnter click (value is selected right from the input)', () => {
      initResponsiveTest('Tablet');
      const handleChange = jest.fn();

      render(
        <Select
          {...props}
          freeSoloCreatable
          onChange={(e, v) => handleChange(v)}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            return option.label;
          }}
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'testValue');
      userEvent.keyboard('{enter}');
      expect(handleChange).toHaveBeenCalledWith('testValue');
      expect(searchInput).toHaveValue('testValue');
    });

    it('Should trigger onChange with a new value when click on `Add "inputValue"` option in dropdown', () => {
      initResponsiveTest('Tablet');
      const handleChange = jest.fn();

      render(<Select {...props} freeSoloCreatable onChange={(e, v) => handleChange(v)} />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'qwerty');

      const option = screen.getByRole('option', { name: /qwerty/ });
      userEvent.click(option);
      expect(handleChange).toHaveBeenCalledWith({
        inputVal: 'qwerty',
        label: 'Add "qwerty"',
        value: FreeSoloCreatableOptionValue,
      });
      expect(searchInput).toHaveValue('qwerty');
    });

    it('Should not create select option with inputValue if an option with the same inputValue exists in the dropdown', () => {
      initResponsiveTest('Tablet');
      render(<Select {...props} freeSoloCreatable />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, 'option 1');

      expect(screen.queryByText('No results')).not.toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(1);
      expect(screen.getByRole('option', { name: 'option 1' })).toBeInTheDocument();
      expect(screen.queryByRole('option', { name: 'Add "option 1"' })).not.toBeInTheDocument();
    });
  });

  describe('Should select the first option automatically if "autoHighlight" is true', () => {
    beforeEach(() => {
      initResponsiveTest('Tablet');
    });
    it('single', () => {
      render(<Select {...props} autoHighlight />);

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, '3');
      expect(screen.getByRole('option', { name: 'option 3' })).toBeInTheDocument();

      userEvent.keyboard('{enter}');
      expect(searchInput).toHaveValue('option 3');
    });

    it('multiple', () => {
      let value: { label: string; value: string }[] = [];
      render(
        <Select
          {...props}
          autoHighlight
          multiple
          value={value}
          onChange={(e, v) => {
            value = v;
          }}
        />
      );

      const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
      userEvent.type(searchInput, '2');
      userEvent.keyboard('{enter}');
      expect(value).toEqual([{ label: 'option 2', value: 'value 2' }]);
    });
  });

  it('Should set hover state for autoHighlighted item', () => {
    initResponsiveTest('Tablet');
    render(<Select {...props} autoHighlight />);

    const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(searchInput, 'option');
    const highlitedOption = screen.getByRole('option', { name: 'option 1' });
    expect(highlitedOption.className).toMatch('itemWithAutoHighlight');
  });

  it('it should virtualize options and render just 12 instead of 20', () => {
    initResponsiveTest('Tablet');
    const manyOptions = Array.from(new Array(20)).map((_, index) => {
      return {
        label: `option ${index}`,
        value: `value ${index}`,
      };
    });

    render(<Select {...props} options={manyOptions} />);
    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.click(input);

    const displayedOptions = screen.getAllByRole('option');
    expect(displayedOptions).toHaveLength(12);
  });

  it('it should not virtualize options and render all 20 items', () => {
    initResponsiveTest('Tablet');
    const manyOptions = Array.from(new Array(20)).map((_, index) => {
      return {
        label: `option ${index}`,
        value: `value ${index}`,
      };
    });

    render(<Select {...props} options={manyOptions} isVirtualized={false} />);
    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.click(input);

    const displayedOptions = screen.getAllByRole('option');
    expect(displayedOptions).toHaveLength(20);
  });

  it('should filter by multiple option params', () => {
    initResponsiveTest('Desktop');

    render(<Select {...props} options={multiParamOptions} findByAllParams={['additionalParam']} />);
    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(input, 'additionalParam 1');

    const displayedOptions = screen.getAllByRole('option');
    expect(displayedOptions).toHaveLength(1);

    expect(screen.getByRole('option', { name: 'option 1' })).toBeInTheDocument();
    expect(screen.queryByText('option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('option 3')).not.toBeInTheDocument();
  });

  it('should filter only by single option params', () => {
    initResponsiveTest('Desktop');
    const { getByRole, queryByText, getAllByRole } = render(<Select {...props} options={multiParamOptions} />);

    const input = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(input, 'option 1');

    expect(getAllByRole('option')).toHaveLength(1);
    expect(getByRole('option', { name: 'option 1' })).toBeInTheDocument();
    expect(queryByText('option 2')).not.toBeInTheDocument();
    expect(queryByText('option 3')).not.toBeInTheDocument();
  });
});

describe('Should  "autoHighlightWhenFilled" behave correctly', () => {
  beforeEach(() => {
    initResponsiveTest('Tablet');
  });

  it('should not select if not filled', () => {
    render(<Select {...props} autoHighlightWhenFilled />);

    const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.click(searchInput);
    expect(screen.getByRole('option', { name: 'option 3' })).toBeInTheDocument();

    userEvent.keyboard('{tab}');
    expect(searchInput).toHaveValue('');
  });
  it('should select if textfield is filled', () => {
    render(<Select {...props} autoHighlightWhenFilled />);

    const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.type(searchInput, '3');
    expect(screen.getByRole('option', { name: 'option 3' })).toBeInTheDocument();

    userEvent.keyboard('{enter}');
    expect(searchInput).toHaveValue('option 3');
  });
  it('should select if navigated the list with arrow button', () => {
    render(<Select {...props} autoHighlightWhenFilled />);

    const searchInput = screen.getByLabelText('Label', { selector: 'input', exact: false });
    userEvent.click(searchInput);

    userEvent.keyboard('{arrowDown}');
    userEvent.keyboard('{enter}');
    expect(searchInput).toHaveValue('option 1');
  });
});
