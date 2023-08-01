import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'paperNavigation' | 'widthXs' | 'widthMd'>({ name: 'Drawer' })(
  (theme, _, classes) => ({
    paper: {
      minWidth: 288,
      maxWidth: '50%',
      [`&.${classes.paperNavigation}`]: {
        width: 288,
      },
      [`&.${classes.widthXs}`]: {
        width: 288,
      },
      [`&.${classes.widthMd}`]: {
        width: 400,
      },
    },
    paperNavigation: {},
    widthXs: {},
    widthMd: {},

    content: {
      padding: theme.layoutSpacing['spacing/400'],
    },

    disablePaddings: {
      padding: theme.layoutSpacing['spacing/000'],
    },
  })
);

export default useStyles;
