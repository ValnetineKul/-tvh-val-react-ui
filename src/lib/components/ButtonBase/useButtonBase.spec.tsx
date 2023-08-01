import React from 'react';
import { Link } from 'react-router-dom';
import { renderHook } from '../../test-utils';
import useButtonBase from './useButtonBase';

describe('useButtonBase hook', () => {
  describe('Should return correct props', () => {
    it('for a regular button', () => {
      const { result } = renderHook(() =>
        useButtonBase({
          disabled: true,
        })
      );

      expect(result.current).toEqual({
        component: 'button',
        disabled: true,
      });
    });

    it('when href is passed', () => {
      const { result } = renderHook(() =>
        useButtonBase({
          href: '/url',
          disabled: true,
        })
      );

      expect(result.current).toEqual({
        component: 'a',
        href: '/url',
        'aria-disabled': true,
        download: false,
      });
    });

    it('when to is passed', () => {
      const { result } = renderHook(() =>
        useButtonBase({
          to: '/url',
          component: Link,
          disabled: true,
        })
      );

      expect(result.current).toEqual({
        component: Link,
        to: '/url',
        'aria-disabled': true,
        download: false,
      });
    });

    it('for a custom component', () => {
      const CustomComponent: React.FC = () => <div />;

      const { result } = renderHook(() =>
        useButtonBase({
          component: CustomComponent,
          disabled: true,
        })
      );

      expect(result.current).toEqual({
        component: CustomComponent,
        disabled: true,
      });
    });

    describe('when download is passed', () => {
      it('anchor', () => {
        const { result } = renderHook(() =>
          useButtonBase({
            href: '/url',
            download: true,
          })
        );

        expect(result.current).toEqual({
          component: 'a',
          href: '/url',
          'aria-disabled': false,
          download: true,
        });
      });

      it('router link', () => {
        const { result } = renderHook(() =>
          useButtonBase({
            to: '/url',
            component: Link,
            download: true,
          })
        );

        expect(result.current).toEqual({
          component: Link,
          to: '/url',
          'aria-disabled': false,
          download: true,
        });
      });
    });

    describe('when target is passed', () => {
      it('anchor', () => {
        const { result } = renderHook(() =>
          useButtonBase({
            href: '/url',
            target: '_blank',
          })
        );

        expect(result.current).toEqual({
          component: 'a',
          href: '/url',
          'aria-disabled': false,
          download: false,
          target: '_blank',
        });
      });

      it('router link', () => {
        const { result } = renderHook(() =>
          useButtonBase({
            to: '/url',
            component: Link,
            target: '_blank',
          })
        );

        expect(result.current).toEqual({
          component: Link,
          to: '/url',
          'aria-disabled': false,
          download: false,
          target: '_blank',
        });
      });
    });
  });
});
