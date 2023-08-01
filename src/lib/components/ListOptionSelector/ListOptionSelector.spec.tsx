import React from 'react';
import { render, userEvent, screen, initResponsiveTest } from '../../test-utils';

import ListOptionSelector from './ListOptionSelector';

const options = [
  { label: 'most recent', value: 'date,desc' },
  { label: 'oldest', value: 'date,asc' },
];

const props = {
  label: 'Sort by:',
  options,
  onChange: jest.fn(),
};

describe('ListOptionSelector', () => {
  it('Should render correctly', () => {
    const { container } = render(<ListOptionSelector {...props} value="date,desc" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should emit the value on change when options are objects', () => {
    const handleChange = jest.fn();
    render(<ListOptionSelector {...props} value="date,desc" onChange={(v) => handleChange(v)} />);

    const dropdown = screen.getByRole('button');
    expect(dropdown.textContent).toMatch(/most recent/);
    userEvent.click(dropdown);

    const oldestButton = screen.getByRole('button', { name: 'oldest' });
    userEvent.click(oldestButton);

    expect(handleChange).toHaveBeenCalledWith('date,asc');
  });

  it('Should emit the value on change when options are numbers', () => {
    const handleChange = jest.fn();
    render(
      <ListOptionSelector
        label="Items per page:"
        value={10}
        options={[{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }]}
        onChange={(v) => handleChange(v)}
      />
    );

    const dropdown = screen.getByRole('button');
    expect(dropdown.textContent).toMatch(/10/);
    userEvent.click(dropdown);

    const twentyButton = screen.getByRole('button', { name: '20' });
    userEvent.click(twentyButton);

    expect(handleChange).toHaveBeenCalledWith(20);
  });

  it('Should not call onChange callback when user clicks on the already selected option', () => {
    const handleChange = jest.fn();
    render(<ListOptionSelector {...props} value="date,desc" onChange={handleChange} />);
    const selectedOption = screen.getByText('most recent');
    userEvent.click(selectedOption);
    expect(handleChange).toBeCalledTimes(0);
  });

  it('Should call onSelectAll with correct params by click on select all', () => {
    const handleSelectAll = jest.fn();
    const { rerender } = render(
      <ListOptionSelector
        {...props}
        value={['date,desc']}
        selectAllLabel="Select all"
        onChange={() => {}}
        onSelectAll={handleSelectAll}
        multiple
      />
    );
    userEvent.click(screen.getByRole('button', { name: 'most recent' }));
    const selectAllOption = screen.getByText('Select all');
    userEvent.click(selectAllOption);
    expect(handleSelectAll).toBeCalledTimes(1);
    expect(handleSelectAll).toBeCalledWith(true, ['date,desc', 'date,asc']);

    rerender(
      <ListOptionSelector
        {...props}
        value={['date,desc', 'date,asc']}
        selectAllLabel="Select all"
        onChange={() => {}}
        onSelectAll={handleSelectAll}
        multiple
      />
    );
    const selectAllOption2 = screen.getByText('Select all');
    userEvent.click(selectAllOption2);
    expect(handleSelectAll).toBeCalledTimes(2);
    expect(handleSelectAll).toBeCalledWith(false, ['date,desc', 'date,asc']);
  });

  describe('Should show multi selected value', () => {
    it('should show custom label for multiple', () => {
      initResponsiveTest('Desktop');
      render(<ListOptionSelector {...props} multiple value={[]} overrideMultiSelectLabel={() => 'custom label'} />);

      expect(screen.getByText('custom label')).toBeInTheDocument();
    });
    it('for a multi value (0 option selected)', () => {
      initResponsiveTest('Desktop');
      render(<ListOptionSelector {...props} multiple value={[]} />);

      userEvent.click(screen.getByRole('button'));

      const option1 = screen.getByRole('menuitem', { name: /most recent/ });
      const option2 = screen.getByRole('menuitem', { name: /oldest/ });
      expect(option1.className).not.toMatch('Mui-selected');
      expect(option2.className).not.toMatch('Mui-selected');
      expect(screen.getByRole('button').textContent).toMatch(/Select a value/);
    });

    it('for a multi value (1 option selected)', () => {
      initResponsiveTest('Desktop');
      render(<ListOptionSelector {...props} multiple value={['date,desc']} />);

      userEvent.click(screen.getByRole('button'));

      const option1 = screen.getByRole('menuitem', { name: /most recent/ });
      const option2 = screen.getByRole('menuitem', { name: /oldest/ });
      expect(option1.className).toMatch('Mui-selected');
      expect(option2.className).not.toMatch('Mui-selected');
      expect(screen.getByRole('button').textContent).toMatch(/most recent/);
    });

    it('for a multi value (several options selected)', () => {
      initResponsiveTest('Desktop');
      render(<ListOptionSelector {...props} multiple value={['date,desc', 'date,asc']} />);

      userEvent.click(screen.getByRole('button'));

      const option1 = screen.getByRole('menuitem', { name: /most recent/ });
      const option2 = screen.getByRole('menuitem', { name: /oldest/ });
      expect(option1.className).toMatch('Mui-selected');
      expect(option2.className).toMatch('Mui-selected');
      expect(screen.getByRole('button').textContent).toMatch(/2 selected/);
    });
  });
});
