import type { FC } from 'react';
import React, { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import type { ToastListProps } from './ToastList';
import ToastList from './ToastList';
import useStyles from './ToastProvider.styles';
import { useScreenSize } from '../../hooks';

let toastIdsList: (number | string)[] = [];

const useToast = () => {
  const { enqueueSnackbar, closeSnackbar, ...rest } = useSnackbar();
  type Options = NonNullable<Parameters<typeof enqueueSnackbar>[1]>;

  return {
    enqueueToast: (message: ToastListProps['message'], options?: Options) => {
      const defaultOptions: Partial<Options> = {};
      if (!options || !options.key) {
        defaultOptions.key = uuidv4();
      }
      if (message.status === 'error' || message.status === 'loading') {
        defaultOptions.autoHideDuration = null;
      }
      if (options && options.key) {
        toastIdsList.push(options.key);
      } else {
        toastIdsList.push(defaultOptions.key);
      }

      return enqueueSnackbar(message, { ...defaultOptions, ...options });
    },
    removeFromToastIdsList: (id: string | number) => {
      toastIdsList = toastIdsList.filter((toastId) => toastId !== id);
    },
    closeToastsOnPageChange: () => {
      toastIdsList.forEach((listId) => {
        if (!listId.toString().includes('listsLoadingPersistentToast')) {
          toastIdsList = toastIdsList.filter((toastId) => toastId !== listId);
          closeSnackbar(listId);
        }
      });
    },
    closeToast: closeSnackbar,
    ...rest,
  };
};

export interface ToastProviderProps {
  rootNode?: HTMLElement | null;
  className?: string;
  children: unknown;
}

const ToastProvider: FC<ToastProviderProps> = ({ rootNode = document.body, className, children }) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const rootClassName = cx(className, classes.root, {
    [classes.expanded]: !isExpanded,
    [classes.mobile]: !isTabletUp,
  });

  return (
    <SnackbarProvider
      domRoot={rootNode || undefined}
      classes={{ containerRoot: rootClassName, root: classes.snackRoot }}
      maxSnack={50}
      autoHideDuration={10000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      // @ts-ignore
      onClick={handleClick}
      preventDuplicate
      // message type is overridden because custom snackbar doesn't pass other toast props
      // needs to be refactored after the fix is released
      // https://github.com/iamhosseindhv/notistack/pull/362
      content={(key, message: ToastListProps['message']) => <ToastList key={key} id={key} message={message} />}
    >
      {children}
    </SnackbarProvider>
  );
};

export { ToastProvider, useToast };
export default ToastProvider;
