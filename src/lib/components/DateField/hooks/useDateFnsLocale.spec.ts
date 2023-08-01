import { renderHook } from '../../../test-utils';
import useDateFnsLocale from './useDateFnsLocale';

describe('useDateFnsLocale', () => {
  it('Should load locale', () => {
    const { result } = renderHook(() => useDateFnsLocale('en-US'));
    expect(result.current.locale.code).toBe('en-US');
  });
  it('Should load language locale', () => {
    const { result } = renderHook(() => useDateFnsLocale('fr-BE'));
    expect(result.current.locale.code).toBe('fr');
  });
  it('Should return default locale', () => {
    const { result } = renderHook(() => useDateFnsLocale('error'));
    expect(result.current.locale.code).toBe('en-GB');
  });
});
