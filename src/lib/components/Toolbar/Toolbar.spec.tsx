import React from 'react';
import { userEvent, render, initResponsiveTest } from '../../test-utils';
import SearchField from '../SearchField';
import Toolbar from './Toolbar';

const props = {
  component: <SearchField value="" onChange={jest.fn()} placeholder="searchList" />,
  listOptions: [
    {
      label: 'Label',
      value: 10,
      options: [{ value: 10 }, { value: 30 }, { value: 50 }, { label: 'View all', value: 'viewAll' }],
      onChange: jest.fn(),
    },
  ],
  onSearch: jest.fn(),
};

describe('Toolbar', () => {
  beforeEach(() => {
    initResponsiveTest('Desktop');
  });
  it('Should render correctly', () => {
    const { container } = render(<Toolbar {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should emit the value on items per page change', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(min-width: 640px)',
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    const hanleOnChange = jest.fn();
    const { getByRole } = render(
      <Toolbar
        listOptions={[
          {
            label: 'Items',
            value: 10,
            options: [{ value: 10 }, { value: 30 }, { value: 50 }, { label: 'View all', value: 'viewAll' }],
            onChange: hanleOnChange,
          },
          {
            label: 'Sort by:',
            value: 'date_modified,asc',
            options: [
              { label: 'Date modified (newest)', value: 'date_modified,asc' },
              { label: 'Date modified (oldest)', value: 'date_modified,desc' },
              { label: 'Creation date (newest)', value: 'date_created,asc' },
              { label: 'Creation date (oldest)', value: 'date_created,desc' },
            ],
            onChange: jest.fn(),
          },
        ]}
      />
    );

    const dropdown = getByRole('button', { name: '10' });
    expect(dropdown.textContent).toMatch(/10/);
    userEvent.click(dropdown);

    expect(getByRole('tooltip')).toBeInTheDocument();

    const fiftyButton = getByRole('button', { name: '50' });
    userEvent.click(fiftyButton);

    expect(hanleOnChange).toHaveBeenCalledWith(50);
  });
  it('Should emit the value on switch change', () => {
    const hanleOnChange = jest.fn();
    const { getByRole } = render(
      <Toolbar
        listOptions={[
          {
            label: 'Items',
            value: 10,
            options: [{ value: 10 }, { value: 30 }, { value: 50 }],
            onChange: jest.fn,
          },
        ]}
        switches={[
          {
            label: 'Only my offers',
            checked: false,
            onChange: (_, checked) => hanleOnChange(checked),
          },
        ]}
      />
    );

    const switchComponenent = getByRole('checkbox') as HTMLInputElement;
    userEvent.click(switchComponenent);
    expect(hanleOnChange).toHaveBeenCalledWith(true);
  });

  it('Should emit the value on SegmmentedControl change', () => {
    const segmentsWithIcons = [
      {
        label: 'Listview',
        value: 'listview',
      },
      {
        label: 'Gridview',
        value: 'gridview',
      },
    ];
    const hanleOnChange = jest.fn();
    const { getByRole } = render(
      <Toolbar
        listOptions={[
          {
            label: 'Items',
            value: 10,
            options: [{ value: 10 }, { value: 30 }, { value: 50 }],
            onChange: jest.fn,
          },
        ]}
        segmentedControl={{
          name: '',
          segmentList: segmentsWithIcons,
          onSegmentChange: hanleOnChange,
        }}
      />
    );

    const radioButton = getByRole('radio', { name: 'Gridview' }) as HTMLInputElement;
    userEvent.click(radioButton);
    expect(hanleOnChange).toHaveBeenCalledTimes(1);
    expect(hanleOnChange).toHaveBeenCalledWith('gridview', 1);
  });
});
