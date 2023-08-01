import { makeStyles } from '../../../../themes/core';
import { surface } from '../../TextField/TextField.constants';

const useStyles = makeStyles({ name: 'DateTextField' })((theme) => ({
  adornmentInputRoot: {
    width: '100%',
    '& input': {
      height: 24,
      ...theme.font['screen/body500/regular/default'],
      padding: `calc(${theme.layoutSpacing['spacing/400']} + ${theme.layoutSpacing['spacing/200']}) ${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']} !important`,
      color: theme.color[`text/onSurface${surface}/default`],

      '&:disabled': {
        WebkitTextFillColor: theme.color[`text/onSurface${surface}/disabled`],
      },
      '&::placeholder': {
        color: `${theme.color[`text/onSurface${surface}/placeholder`]} !important`,
        opacity: 1,
      },
    },
    '& fieldset': {
      border: 'none',
    },
  },

  input: {
    '& input': {
      padding: '0px !important',
    },
  },

  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
}));

export default useStyles;
