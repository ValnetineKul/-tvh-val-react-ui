import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = {
  surface: Surface;
};

const useStyles = makeStyles<Props>({ name: 'DropdownAction' })((theme, { surface }) => ({
  root: {
    '& svg': {
      color: theme.color[`icon/onSurface${surface}/action/default`],
    },
    '&:hover, &:focus': {
      '& svg': {
        color: theme.color[`icon/onSurface${surface}/action/default`],
      },
    },
  },
}));

export default useStyles;
