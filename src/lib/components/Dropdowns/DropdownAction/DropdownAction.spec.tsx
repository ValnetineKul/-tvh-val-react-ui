import React from 'react';
import { render } from '../../../test-utils';
import DropdownAction from './DropdownAction';

describe('DropdownAction', () => {
  it('Should render correctly', () => {
    const { container } = render(<DropdownAction label="label" onClick={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
