import React from 'react';
import { render } from '../../../test-utils';
import DateTextField from './DateTextField';

describe('DateTextField', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <DateTextField
        format="dd/MM/yyyy"
        setIsInputFocused={() => {}}
        adornmentInputValue={new Date('03/10/2022')}
        onAdornmentInputValueChange={() => {}}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
