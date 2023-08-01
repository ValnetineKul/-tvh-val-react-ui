import React from 'react';
import type { ComponentProps } from 'react';
import { render } from '../../test-utils';
import Drawer from './Drawer';

type Props = ComponentProps<typeof Drawer>;

const props: Props = {
  anchor: 'left',
  open: true,
  isLogo: true,
  onClose: () => {},
};

describe('Drawer', () => {
  it('Should render correctly', () => {
    const { baseElement } = render(
      <Drawer {...props}>
        <span>Test</span>
      </Drawer>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Should toggle drawer', () => {
    const { getByText, queryByText, rerender } = render(
      <Drawer {...props}>
        <span>Test</span>
      </Drawer>
    );
    expect(getByText('Test')).toBeInTheDocument();
    rerender(
      <Drawer {...props} open={false}>
        <span>Test</span>
      </Drawer>
    );
    expect(queryByText('Test')).not.toBeInTheDocument();
  });

  describe('Should set width for custom drawer', () => {
    const cases = [
      [undefined, 'Drawer-widthMd'],
      ['xs', 'Drawer-widthXs'],
      ['md', 'Drawer-widthMd'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof Drawer>['width'], expected: string) => {
        const { getByText } = render(
          <Drawer {...props} width={input}>
            <span>Test</span>
          </Drawer>
        );
        const content = getByText('Test');
        const drawer = content.parentElement?.parentElement;
        expect(drawer?.className).toMatch(expected);
      }
    );
  });

  it('Should disable paddings for custom drawer', () => {
    const { getByText } = render(
      <Drawer {...props} disablePaddings>
        <span>Test</span>
      </Drawer>
    );

    const content = getByText('Test');
    expect(content.parentElement?.className).toMatch('Drawer-disablePaddings');
  });

  it('Should not disable paddings for custom drawer', () => {
    const { getByText } = render(
      <Drawer {...props} disablePaddings={false}>
        <span>Test</span>
      </Drawer>
    );

    const content = getByText('Test');
    expect(content.parentElement?.className).toMatch('Drawer-content');
  });
});
