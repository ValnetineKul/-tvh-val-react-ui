import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'InputAdornment' })(() => ({
  root: {
    height: 'auto',
  },
  adjustToBottom: {
    marginBottom: -15,
  },
}));

export default useStyles;
