import React from 'react';
import { render } from '../../test-utils';
import TabNavigation from './TabNavigation';

const tabs = [
  {
    id: 'First tab',
    label: 'First tab',
    component: 'First tab content',
  },
  {
    id: 'Second tab',
    label: 'Second tab',
    count: 12,
    component: 'Second tab content',
  },
  {
    id: 'Third tab',
    label: 'Third tab',
    component: 'Third tab content',
  },
];

describe('TabNavigation', () => {
  it('Should render correctly', () => {
    const { container } = render(<TabNavigation tabList={tabs} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should add custom className', () => {
    const { container } = render(<TabNavigation tabList={tabs} className="custom-class-name" />);
    expect(container.firstChild).toHaveClass('custom-class-name');
  });

  it('Should render badge', () => {
    const { getByText } = render(<TabNavigation tabList={tabs} />);
    const badge = getByText(/12/);
    expect(badge).toBeInTheDocument();
  });

  it('Should switch tab on click', async () => {
    const onTabChange = jest.fn();
    const { getByRole } = render(<TabNavigation tabList={tabs} onTabChange={onTabChange} />);
    const firstTab = getByRole('tab', { name: 'First tab' });
    const secondTab = getByRole('tab', { name: 'Second tab 12' });

    expect(getByRole('tabpanel').textContent).toMatch('First tab content');

    secondTab.click();
    expect(getByRole('tabpanel').textContent).toMatch('Second tab content');
    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith('Second tab');

    firstTab.click();
    expect(getByRole('tabpanel').textContent).toMatch('First tab content');
    expect(onTabChange).toHaveBeenCalledTimes(2);
    expect(onTabChange).toHaveBeenCalledWith('First tab');
  });

  it('Should set active tab', () => {
    const { getByText } = render(<TabNavigation tabList={tabs} activeTab="Second tab" />);
    const activeButtonTab = getByText('Second tab').closest('button');
    expect(activeButtonTab).toHaveAttribute('aria-selected', 'true');
  });
});
