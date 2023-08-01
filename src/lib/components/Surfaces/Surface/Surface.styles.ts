import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = {
  surface: Surface;
};

const useStyles = makeStyles<Props>({ name: 'Surface' })((theme, { surface }) => ({
  root: {
    backgroundColor: theme.color[`bg/surface${surface}/default` as const],
    color: theme.color[`text/onSurface${surface}/default` as const],
  },

  border: {
    border: '1px solid',
    borderColor: theme.color[`border/onSurface${surface}/default` as const],
  },
}));

export default useStyles;
