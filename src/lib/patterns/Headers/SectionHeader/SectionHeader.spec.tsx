import React from 'react';
import { render, screen } from '../../../test-utils';
import SectionHeader from './SectionHeader';

const props = {
  title: 'Section Header Title',
  headerActions: <div>Action Buttons</div>,
};
describe('SectionHeader', () => {
  it('Should render correctly', () => {
    const { container } = render(<SectionHeader {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should render subtitle', () => {
    render(<SectionHeader {...props} subtitle="subtitle here" />);
    expect(screen.getByText(/subtitle here/)).toBeInTheDocument();
  });
});
