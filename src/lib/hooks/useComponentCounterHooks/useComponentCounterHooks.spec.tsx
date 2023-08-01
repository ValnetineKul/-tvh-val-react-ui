import React from 'react';
import { render, renderHook } from '../../test-utils';
import { useComponentCount, useComponentCountController } from './useComponentCounterHooks';

type ComponentName = Parameters<typeof useComponentCountController>[0];

const Component = ({ name, open }: { name: ComponentName; open: boolean }) => {
  useComponentCountController(name, open);
  return null;
};

describe('useComponentCount', () => {
  it('Should count components', () => {
    const { rerender: rerender1, unmount: unmount1 } = render(<Component name="Modal" open={false} />);
    const { result: result1 } = renderHook(() => {
      return useComponentCount('Modal');
    });
    const { result: result2 } = renderHook(() => {
      return useComponentCount('DropdownMenu:mobile');
    });

    expect(result1.current.isVisible).toBe(false);
    expect(result1.current.count).toBe(0);

    rerender1(<Component name="Modal" open />);

    expect(result1.current.isVisible).toBe(true);
    expect(result1.current.count).toBe(1);

    const { unmount: unmount2 } = render(<Component name="Modal" open />);
    expect(result1.current.isVisible).toBe(true);
    expect(result1.current.count).toBe(2);

    render(<Component name="DropdownMenu:mobile" open />);
    expect(result1.current.isVisible).toBe(true);
    expect(result1.current.count).toBe(2);
    expect(result2.current.isVisible).toBe(true);
    expect(result2.current.count).toBe(1);

    unmount1();
    expect(result1.current.isVisible).toBe(true);
    expect(result1.current.count).toBe(1);
    expect(result2.current.isVisible).toBe(true);
    expect(result2.current.count).toBe(1);

    unmount2();
    expect(result1.current.isVisible).toBe(false);
    expect(result1.current.count).toBe(0);
    expect(result2.current.isVisible).toBe(true);
    expect(result2.current.count).toBe(1);
  });
});
