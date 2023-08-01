import { createContext } from 'react';

interface HasSingleIconButtonProps {
  hasSingleIconButton: boolean;
  setHasSingleIconButton: (hasIconButton: boolean) => void;
}

const HasSingleIconButtonContext = createContext<HasSingleIconButtonProps>({
  hasSingleIconButton: false,
  setHasSingleIconButton: () => {},
});

export { HasSingleIconButtonContext, HasSingleIconButtonProps };
