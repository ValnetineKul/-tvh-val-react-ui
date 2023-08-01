import React from 'react';
import { render } from '../../../test-utils';
import { Comment } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import FloatingActionButton from './FloatingActionButton';

describe('FloatingActionButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<FloatingActionButton onClick={jest.fn()} icon={<Icon icon={Comment} />} />);
    expect(container).toMatchSnapshot();
  });

  it('Should get callback on click', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(<FloatingActionButton onClick={onClickMock} icon={<Icon icon={Comment} />} />);
    const button = getByRole('button');
    button.click();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
