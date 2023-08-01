import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'PhoneField' })((theme) => ({
  root: {
    '& label': {
      paddingLeft: `calc(${theme.layoutSpacing['spacing/550']} + ${theme.layoutSpacing['spacing/300']}) !important`,
    },
  },
  rootReadOnly: {
    '& label': {
      paddingLeft: `${theme.layoutSpacing['spacing/500']} !important`,
    },
  },
  input: {
    paddingLeft: `${theme.layoutSpacing['spacing/600']} !important`,
  },
  inputReadOnly: {
    paddingLeft: `${theme.layoutSpacing['spacing/525']} !important`,
  },
  inputElement: {
    paddingLeft: `${theme.layoutSpacing['spacing/000']} !important`,
  },
}));

export default useStyles;
