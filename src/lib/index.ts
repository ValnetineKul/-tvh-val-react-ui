import * as components from './components';
import * as patters from './patterns';

import * as helpers from './helpers';
import * as hooks from './hooks/useScreenSize';
import * as types from './types/common';
import * as utils from './utils/refs';

const lib = {
  ...components,
  ...patters,
  helpers,
  hooks,
  types,
  utils,
};

export default lib;
