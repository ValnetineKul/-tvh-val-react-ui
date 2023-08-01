import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'expanded' | 'snackRoot' | 'mobile'>({ name: 'ToastProvider' })(
  (theme, _params, classes) => ({
    root: {
      '&>div': {
        paddingLeft: theme.layoutSpacing['spacing/000'],
        paddingRight: theme.layoutSpacing['spacing/000'],
        margin: `${theme.layoutSpacing['spacing/000']} auto`,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'auto',
        },
      },

      '& .MuiCollapse-root > .MuiCollapse-wrapper.MuiCollapse-wrapper': {
        justifyContent: 'flex-end',
        padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']}`,
      },

      [`&.${classes.expanded}`]: {
        maxHeight: '80vh',
        '&>div:not(:nth-last-child(-n+4))': {
          transform: 'scale(0.95)',
          position: 'absolute',
          bottom: -8,

          [`& .${classes.snackRoot}`]: {
            '&>div>div>*': {
              display: 'none',
            },
          },
        },
        '&>div:not(:nth-last-child(-n+5))': {
          '& div': {
            boxShadow: 'none',
          },
        },
      },
      [`&.${classes.mobile}`]: {
        bottom: theme.layoutSpacing['spacing/200'],
        right: theme.layoutSpacing['spacing/300'],
        maxWidth: `calc(100% - ${theme.layoutSpacing['spacing/400']})`,
      },

      [`&:not(.${classes.mobile})`]: {
        bottom: 20,
        right: 24,
      },
    },
    expanded: {},
    mobile: {
      [`&.${classes.expanded}`]: {
        '&>div:not(:nth-last-child(-n+2))': {
          position: 'absolute',
          bottom: -8,
          left: '50%',
          transform: 'translateX(-50%) scale(0.95)',

          [`& .${classes.snackRoot}`]: {
            '&>div>div>*': {
              display: 'none',
            },
          },
        },
        '&>div:not(:nth-last-child(-n+3))': {
          '& div': {
            boxShadow: 'none',
          },
        },
      },
    },

    snackRoot: {},
  })
);

export default useStyles;
