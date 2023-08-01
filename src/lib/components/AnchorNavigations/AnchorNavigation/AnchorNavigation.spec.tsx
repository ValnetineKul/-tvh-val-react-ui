import React from 'react';
import { render } from '../../../test-utils';
import AnchorNavigation from './AnchorNavigation';

const items = [
  {
    label: 'link1',
    component: <div style={{ height: '20vh' }}>link1</div>,
  },
  {
    label: 'link2',
    component: <div style={{ height: '20vh' }}>link2</div>,
    surface: '100' as const,
  },
  {
    label: 'link3',
    component: <div style={{ height: '20vh' }}>link3</div>,
    surface: '200' as const,
  },
  {
    label: 'link4',
    component: <div style={{ height: '20vh' }}>link4</div>,
    surface: '300' as const,
  },
];

describe('AnchorNavigation', () => {
  it('Should render correctly', () => {
    const { container } = render(<AnchorNavigation items={items} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should not add paddingBottom', () => {
    const { getByRole, container } = render(<AnchorNavigation items={items} />);

    const wrapper = container.firstChild as HTMLDivElement;
    const lastComponent = wrapper.childNodes[wrapper.childNodes.length - 1];
    const nav = getByRole('navigation');

    Object.defineProperties(wrapper, {
      offsetHeight: {
        configurable: true,
        value: 1013,
      },
      offsetTop: {
        configurable: true,
        value: 954,
      },
    });

    Object.defineProperty(lastComponent, 'offsetHeight', { configurable: true, value: 760 });
    Object.defineProperty(document.body, 'offsetHeight', { configurable: true, value: 2606 });
    Object.defineProperty(nav, 'offsetHeight', { configurable: true, value: 58 });

    const paddingBottomValue = getComputedStyle(wrapper, null).getPropertyValue('padding-bottom');
    expect(paddingBottomValue).toBe('');
  });

  describe('Should set headers type', () => {
    it.each([
      [undefined, 'headerFunctional'],
      ['functional' as const, 'headerFunctional'],
      ['commercial' as const, 'headerCommercial'],
    ])('type = %s', (type, className) => {
      const { getByRole } = render(<AnchorNavigation items={items} headersType={type} />);
      const header = getByRole('heading', { name: 'link1' });
      expect(header.className).toMatch(className);
    });
  });
});
