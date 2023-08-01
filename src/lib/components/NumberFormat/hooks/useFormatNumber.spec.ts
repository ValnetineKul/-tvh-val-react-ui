import { renderHook } from '../../../test-utils';
import useFormatNumber from './useFormatNumber';

describe('useFormatNumber', () => {
  it('Should return formatted number', () => {
    const { result } = renderHook(() => useFormatNumber());
    expect(result.current.formatNumber(12345.67)).toBe('12,345.67');
  });
});
