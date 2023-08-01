import React from 'react';
import useDisabledTabIndex from './useDisabledTabIndex';
import SpinnerWithBackdrop from '../SpinnerWithBackdrop';
import { render, screen, renderHook } from '../../../../../test-utils';

describe('useTabIndex', () => {
  it('Should return the empty Map if no container passed', () => {
    const tabIndexes = renderHook(() => useDisabledTabIndex(null, true));
    expect(tabIndexes.result.current).toEqual(new Map());
  });

  it('Should return the empty Map if the initial loading value is false', () => {
    const container = document.createElement('div');
    const tabIndexes = renderHook(() => useDisabledTabIndex(container, false));
    expect(tabIndexes.result.current).toEqual(new Map());
  });

  it('Should disable focus on the interactive components and on the components with the custom tabindex', async () => {
    const tabIndex = 2;

    render(
      <SpinnerWithBackdrop isLoading>
        <div>
          <button type="button">button</button>
          <input type="checkbox" />
          <select>
            <option>option 1</option>
          </select>
          <textarea />
          <div role="none" tabIndex={tabIndex} />
        </div>
      </SpinnerWithBackdrop>
    );

    expect(await screen.findByRole('button')).toHaveAttribute('tabIndex', '-1');
    expect(await screen.findByRole('checkbox')).toHaveAttribute('tabIndex', '-1');
    expect(await screen.findByRole('combobox')).toHaveAttribute('tabIndex', '-1');
    expect(await screen.findByRole('textbox')).toHaveAttribute('tabIndex', '-1');
    expect(await screen.findByRole('none')).toHaveAttribute('tabIndex', '-1');
  });

  it('Should correctly restore tabIndexes after the loading ends', async () => {
    const tabIndex = 2;

    const { rerender } = render(
      <SpinnerWithBackdrop isLoading>
        <div>
          <button type="button">button</button>
          <input type="checkbox" />
          <select>
            <option>option 1</option>
          </select>
          <textarea />
          <div role="none" tabIndex={tabIndex} />
        </div>
      </SpinnerWithBackdrop>
    );

    rerender(
      <SpinnerWithBackdrop isLoading={false}>
        <div>
          <button type="button">button</button>
          <input type="checkbox" />
          <select>
            <option>option 1</option>
          </select>
          <textarea />
          <div role="none" tabIndex={tabIndex} />
        </div>
      </SpinnerWithBackdrop>
    );

    expect(await screen.findByRole('button')).toHaveAttribute('tabIndex', '0');
    expect(await screen.findByRole('checkbox')).toHaveAttribute('tabIndex', '0');
    expect(await screen.findByRole('combobox')).toHaveAttribute('tabIndex', '0');
    expect(await screen.findByRole('textbox')).toHaveAttribute('tabIndex', '0');
    expect(await screen.findByRole('none')).toHaveAttribute('tabIndex', '2');
  });
});
