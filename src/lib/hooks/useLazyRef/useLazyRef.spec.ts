import { renderHook } from '../../test-utils';
import useLazyRef from './useLazyRef';

describe('useLazyRef', () => {
  it('should initialize the initial value only once', () => {
    const expectedValue = '21431312';
    const initializationFunction = jest.fn().mockReturnValue(expectedValue);

    const { result, rerender } = renderHook(() => useLazyRef(initializationFunction));

    expect(result.current).toBe(expectedValue);

    rerender();

    expect(initializationFunction).toBeCalledTimes(1);
  });
});
