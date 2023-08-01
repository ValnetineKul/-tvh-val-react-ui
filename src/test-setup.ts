// async test are failing after updating nx to v11.5.1
// probably related to https://p1.netptop.workers.dev/https/github.com/nrwl/nx/issues/5063
// had to include regenerator-runtime to make them work
import 'regenerator-runtime';
import '@testing-library/jest-dom';
import { disableEmotionWarnings } from '@tvh/react-common';

disableEmotionWarnings();

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation((callback) => {
    callback([{ contentRect: { width: 123 } }]);
    return {
      disconnect: jest.fn(),
      observe: jest.fn,
      unobserve: jest.fn(),
    };
  });

jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
