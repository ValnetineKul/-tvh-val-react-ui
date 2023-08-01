import { userEvent, renderHook } from '../../../test-utils';
import useBackToTop from './useBackToTop';

Object.defineProperty(window.screen, 'height', { configurable: true, value: 100 });
const border = window.screen.height * 2;

describe('useBackToTop hook', () => {
  it('Should show "Back to top" button if user scrolls down more than 2 screens and move the scrollbar up', () => {
    const { result } = renderHook(() => useBackToTop());
    expect(result.current).toBeFalsy();

    userEvent.scroll(window, { target: { scrollY: border + 10 } });
    expect(result.current).toBeFalsy();

    userEvent.scroll(window, { target: { scrollY: window.scrollY - 5 } });
    expect(result.current).toBeTruthy();

    userEvent.scroll(window, { target: { scrollY: window.scrollY + 5 } });
    expect(result.current).toBeFalsy();
  });

  it('Should not show "Back to top" button if user scrolls down less than 2 screens', () => {
    const { result } = renderHook(() => useBackToTop());
    expect(result.current).toBeFalsy();

    userEvent.scroll(window, { target: { scrollY: border - 1 } });
    expect(result.current).toBeFalsy();
  });

  it('Should hide "Back to top" button if user scrolls up to the top', () => {
    const { result } = renderHook(() => useBackToTop());
    expect(result.current).toBeFalsy();

    userEvent.scroll(window, { target: { scrollY: border + 10 } });
    expect(result.current).toBeFalsy();

    userEvent.scroll(window, { target: { scrollY: window.scrollY - 5 } });
    expect(result.current).toBeTruthy();

    userEvent.scroll(window, { target: { scrollY: window.scrollY - border / 2 } });
    expect(result.current).toBeTruthy();

    userEvent.scroll(window, { target: { scrollY: window.scrollY - window.scrollY } });
    expect(result.current).toBeFalsy();
  });
});
