import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'StepIndicator' })(() => ({
  root: {
    '& .MuiStep-root': {
      minWidth: 0,
    },
  },
}));

export default useStyles;
