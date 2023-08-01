import React from 'react';
import { render } from '../../test-utils';
import ListLayout from './ListLayout';

const props = {
  className: 'some-class-name',
  Toolbar: <div>Toolbar</div>,
  children: <div>Table or Cards</div>,
  Pagination: <div>Pagination</div>,
};

describe('ListLayout', () => {
  it('Should render correctly', () => {
    const { container } = render(<ListLayout {...props} />);
    expect(container.firstChild).toMatchSnapshot('ListLayout');
  });

  it('Should correctly render all parts of layout', () => {
    const { getByText } = render(<ListLayout {...props} />);

    expect(getByText('Toolbar')).toBeInTheDocument();
    expect(getByText('Table or Cards')).toBeInTheDocument();
    expect(getByText('Pagination')).toBeInTheDocument();
  });
});
