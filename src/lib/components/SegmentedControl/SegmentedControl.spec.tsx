import React from 'react';
import { userEvent, render, initResponsiveTest } from '../../test-utils';
import Icon from '../Icon';
import { List } from '../Icon/icons/functional';
import SegmentedControl from './SegmentedControl';

const segmentList = [
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
    disabled: true,
  },
  {
    label: 'Year',
    value: 'year',
  },
];

const props = {
  name: 'Test name',
  segmentList,
  defaultIndex: 0,
  onSegmentChange: jest.fn(),
};

describe('SegmentedControl', () => {
  it('Should show the list of radio buttons', () => {
    const { getByRole } = render(<SegmentedControl {...props} />);
    expect(getByRole('group', { name: 'Test name' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Day' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Week' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Month' })).toBeInTheDocument();
    expect(getByRole('radio', { name: 'Year' })).toBeInTheDocument();
  });

  it('Should set checked state for radio button', () => {
    const { getByRole } = render(<SegmentedControl {...props} defaultIndex={1} />);
    const radioButton = getByRole('radio', { name: 'Week' }) as HTMLInputElement;
    expect(radioButton).toBeChecked();
  });

  it('Should set disabled state for radio button', () => {
    const { getByRole } = render(<SegmentedControl {...props} />);
    const radioButton = getByRole('radio', { name: 'Month' }) as HTMLInputElement;
    expect(radioButton).toBeDisabled();
  });

  describe('onSegmentChange', () => {
    it('Should trigger onSegmentChange for active radio button', () => {
      const onSegmentChange = jest.fn();
      const { getByRole } = render(<SegmentedControl {...props} onSegmentChange={onSegmentChange} />);
      const radioButton = getByRole('radio', { name: 'Week' }) as HTMLInputElement;
      userEvent.click(radioButton);
      expect(onSegmentChange).toHaveBeenCalledTimes(1);
      expect(onSegmentChange).toHaveBeenCalledWith('week', 1);
    });

    it('Should not trigger onSegmentChange for disabled radio button', () => {
      const onSegmentChange = jest.fn();
      const { getByRole } = render(<SegmentedControl {...props} onSegmentChange={onSegmentChange} />);
      const radioButton = getByRole('radio', { name: 'Month' }) as HTMLInputElement;
      userEvent.click(radioButton);
      expect(onSegmentChange).not.toHaveBeenCalled();
    });
  });

  it('Should not cut long labels (mobile view)', () => {
    initResponsiveTest('Mobile');
    const { getByText, queryByText } = render(
      <SegmentedControl
        {...props}
        segmentList={[
          ...segmentList,
          {
            label: 'Extra long label which is not recommended',
            value: 'long',
          },
        ]}
      />
    );
    const shortLabel = queryByText('Extra long label which is not…');
    expect(shortLabel).not.toBeInTheDocument();

    const longLabel = getByText('Extra long label which is not recommended');
    expect(longLabel).toBeInTheDocument();
  });

  it('Should render icon', () => {
    const { getByText, queryByText } = render(
      <SegmentedControl
        {...props}
        segmentList={[
          ...segmentList,
          {
            label: 'Listview',
            value: 'listview',
            icon: <Icon icon={List} />,
          },
        ]}
      />
    );

    expect(queryByText('Listview')).not.toBeInTheDocument();
    expect(getByText(/list.svg/)).toBeInTheDocument();
  });
});
