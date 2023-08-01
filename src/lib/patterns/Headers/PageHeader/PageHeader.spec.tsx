import React from 'react';
import { render } from '../../../test-utils';
import PageHeader from './PageHeader';

const props = {
  title: 'Page Header Title',
  headerActions: <div>Action Buttons</div>,
  tag: <div>Tag</div>,
  subtitle: 'Subtitle',
};
describe('PageHeader', () => {
  it('Should render correctly', () => {
    const { container, getByText } = render(<PageHeader {...props} />);
    expect(getByText(/Page Header Title/)).toBeInTheDocument();
    expect(getByText(/Subtitle/)).toBeInTheDocument();
    expect(getByText(/Tag/)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
