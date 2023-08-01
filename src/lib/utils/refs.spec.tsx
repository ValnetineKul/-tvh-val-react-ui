import React, { forwardRef, useImperativeHandle } from 'react';
import { render } from '../test-utils';
import { mergeRefs } from './refs';

describe('mergeRefs', () => {
  it('should merge refs', () => {
    const ForwardedRef = forwardRef((_, ref) => {
      useImperativeHandle(ref, () => 'refValue');
      return null;
    });

    const funcRefMock = jest.fn();
    const objRef = { current: undefined };

    const { unmount } = render(<ForwardedRef ref={mergeRefs([objRef, funcRefMock, null, undefined])} />);
    expect(funcRefMock).toHaveBeenCalledTimes(1);
    expect(funcRefMock).toHaveBeenCalledWith('refValue');
    expect(objRef.current).toBe('refValue');

    unmount();
    expect(funcRefMock).toHaveBeenCalledTimes(2);
    expect(funcRefMock).toHaveBeenCalledWith(null);
    expect(objRef.current).toBe(null);
  });
});
