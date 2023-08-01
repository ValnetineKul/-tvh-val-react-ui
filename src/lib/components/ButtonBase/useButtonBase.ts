// This is required since TS needs named type to export as .d.ts file.
// Point being we are npm package now and need to export TS typings.
import type React from 'react';

export interface ButtonBaseProps {
  to?: string;
  href?: string;
  disabled?: boolean;
  download?: boolean;
  component?: React.ElementType;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

const useButtonBase = ({
  to,
  href,
  disabled = false,
  download = false,
  component = 'button',
  target,
}: ButtonBaseProps) => {
  const isLink = to || href;
  const buttonProps = isLink
    ? {
        component: component === 'button' ? 'a' : component,
        'aria-disabled': disabled,
        disabled: undefined as unknown as boolean,
        target,
        download,
      }
    : {
        disabled,
      };

  return {
    component,
    to,
    href,
    ...buttonProps,
  };
};

export default useButtonBase;
