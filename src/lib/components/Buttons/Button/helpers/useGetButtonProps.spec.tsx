import { renderHook } from '../../../../test-utils';
import type { CallToActionButtonProps } from '../../CallToActionButton/CallToActionButton';
import type { ButtonProps } from '../Button';
import useGetButtonProps from './useGetButtonProps';

describe('useGetButtonProps', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Should return true for date and false for not a date', () => {
    const cases = [
      [
        { isLoading: false, props: {}, variant: '' },
        {
          buttonBaseProps: { component: 'button', disabled: false, href: undefined, to: undefined },
          isLink: undefined,
          shouldShowLoader: false,
        },
      ],
      [
        { isLoading: true, props: {}, variant: 'Primary' },
        {
          buttonBaseProps: { component: 'button', disabled: false, href: undefined, to: undefined },
          isLink: undefined,
          shouldShowLoader: true,
        },
      ],
      [
        { isLoading: true, props: {}, variant: 'link' },
        {
          buttonBaseProps: { component: 'button', disabled: false, href: undefined, to: undefined },
          isLink: undefined,
          shouldShowLoader: false,
        },
      ],
      [
        { isLoading: true, props: { to: 'link' }, variant: '' },
        {
          buttonBaseProps: {
            href: undefined,
            to: 'link',
            'aria-disabled': false,
            component: 'a',
            disabled: undefined,
            download: false,
          },
          isLink: 'link',
          shouldShowLoader: false,
        },
      ],
      [
        { isLoading: true, props: { href: 'link' }, variant: '' },
        {
          buttonBaseProps: {
            'aria-disabled': false,
            component: 'a',
            disabled: undefined,
            download: false,
            href: 'link',
            to: undefined,
          },
          isLink: 'link',
          shouldShowLoader: false,
        },
      ],
      [
        { isLoading: true, props: { disabled: true }, variant: '' },
        {
          buttonBaseProps: {
            component: 'button',
            disabled: true,
            href: undefined,
            to: undefined,
          },
          isLink: undefined,
          shouldShowLoader: false,
        },
      ],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (
        input: { isLoading: boolean; props: Partial<ButtonProps | CallToActionButtonProps>; variant: string },
        expected: any
      ) => {
        const { result } = renderHook(() => useGetButtonProps(input.isLoading, input.props, input.variant));
        expect(result.current).toEqual(expected);
      }
    );
  });
});
