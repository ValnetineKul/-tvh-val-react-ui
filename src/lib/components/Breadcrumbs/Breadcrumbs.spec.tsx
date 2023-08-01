import React from 'react';
import { screen, userEvent, render, initResponsiveTest } from '../../test-utils';
import Breadcrumbs from './Breadcrumbs';

const props = {
  backUrl: '/',
  previousPageName: 'PreviousPageName',
  onBackClick: jest.fn(),
  onPreviousPageClick: jest.fn(),
};

describe('Breadcrumbs', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should render correctly', () => {
    const { container } = render(<Breadcrumbs>Children</Breadcrumbs>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show only one navigation item on mobile', () => {
    initResponsiveTest('Mobile');

    render(<Breadcrumbs {...props}>Children</Breadcrumbs>);

    expect(screen.getByRole('link', { name: 'PreviousPageName' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('Should show only one navigation item on mobile', () => {
    initResponsiveTest('Mobile');

    render(<Breadcrumbs {...props}>Children</Breadcrumbs>);
    expect(screen.getByRole('link', { name: 'PreviousPageName' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('Should show back link on tablet', () => {
    initResponsiveTest('Tablet');

    render(<Breadcrumbs {...props}>Children</Breadcrumbs>);
    expect(screen.queryByRole('link', { name: 'PreviousPageName' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
  });

  it('Should show back link on desktop', () => {
    initResponsiveTest('Desktop');

    render(<Breadcrumbs {...props}>Children</Breadcrumbs>);
    expect(screen.queryByRole('link', { name: 'PreviousPageName' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument();
  });

  it('Should callback on previousPageName link click', () => {
    initResponsiveTest('Mobile');

    const onPreviousPageClick = jest.fn();
    render(
      <Breadcrumbs {...props} previousPageName="PreviousPageName" onPreviousPageClick={onPreviousPageClick}>
        Children
      </Breadcrumbs>
    );
    const previousPageNameLink = screen.getByRole('link', { name: 'PreviousPageName' });
    userEvent.click(previousPageNameLink);
    expect(onPreviousPageClick).toHaveBeenCalled();
  });

  it('Should callback on back link click', () => {
    initResponsiveTest('Desktop');

    const onBackClick = jest.fn();
    render(
      <Breadcrumbs backUrl="/" onBackClick={onBackClick}>
        Children
      </Breadcrumbs>
    );
    const backLink = screen.getByRole('link', { name: 'Back' });
    userEvent.click(backLink);
    expect(onBackClick).toHaveBeenCalled();
  });
});
