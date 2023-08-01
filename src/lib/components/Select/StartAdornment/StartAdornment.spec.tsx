import React from 'react';
import { render } from '../../../test-utils';
import StartAdornment from './StartAdornment';

const mockGetOptionStartIcon = jest.fn((value) => <>{value.label}</>);

const generateProps = () => ({
  isEachOptionSelected: false,
  multiple: true,
  value: [
    { label: 'label-1', value: 'value-1' },
    { label: 'label-2', value: 'value-2' },
    { label: 'label-3', value: 'value-3' },
  ],
  getOptionLabel: jest.fn(() => 'option label'),
  getOptionStartIcon: mockGetOptionStartIcon,
  isDisabled: false,
  adjustToBottom: true,
});

describe('StartAdornment', () => {
  describe('Should correctly render multiple values', () => {
    it('Should show all selected when each value is selected', () => {
      const props = generateProps();

      const { getByText } = render(
        <StartAdornment<{ label: string; value: string }, true> {...props} isEachOptionSelected />
      );

      const allSelectedLabel = getByText('All selected');
      expect(allSelectedLabel).toBeTruthy();
    });

    it('Should show all selected when each value is selected', () => {
      const props = generateProps();

      const { getByText } = render(
        <StartAdornment<{ label: string; value: string }, true>
          {...props}
          value={[props.value[0]]}
          getOptionStartIcon={jest.fn()}
        />
      );

      const allSelectedLabel = getByText('option label');
      expect(allSelectedLabel).toBeTruthy();
    });

    it('Should show all selected when each value is selected', () => {
      const props = generateProps();

      const { getByText } = render(
        <StartAdornment<{ label: string; value: string }, true> {...props} value={[props.value[0], props.value[1]]} />
      );

      const allSelectedLabel = getByText('2 selected');
      expect(allSelectedLabel).toBeTruthy();
    });
  });

  describe('Single value', () => {
    it('Should correctly render single value with start icon', () => {
      const props = generateProps();

      const { getByText } = render(
        <StartAdornment<{ label: string; value: string }, false> {...props} value={props.value[0]} />
      );

      const allSelectedLabel = getByText('label-1');
      expect(allSelectedLabel).toBeTruthy();
      expect(mockGetOptionStartIcon).toBeCalled();
    });
  });
});
