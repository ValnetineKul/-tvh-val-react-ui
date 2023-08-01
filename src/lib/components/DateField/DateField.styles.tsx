import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'DateField' })((theme) => ({
  paperRoot: {
    '&.MuiPaper-root': {
      borderRadius: theme.borderRadius['borderRadius/none'],
      marginTop: theme.layoutSpacing['spacing/200'],
      boxShadow: theme.shadow['shadow/300'],
    },
    '& .MuiTypography-root.MuiTypography-caption': {
      color: theme.color['text/onSurface100/default'],
      fontWeight: 700,
    },
    '& .PrivatePickersToolbar-root': {
      display: 'none',
    },
    '& .MuiCalendarPicker-root>div:first-child': {
      borderBottom: `1px solid ${theme.color['border/onSurface100/default']}`,
      margin: theme.layoutSpacing['spacing/000'],
      padding: `${theme.layoutSpacing['spacing/500']} 10px calc(${theme.layoutSpacing['spacing/500']} - 1px) 20px`,
      marginBottom: '10px',
      position: 'relative',

      '& .PrivatePickersFadeTransitionGroup-root': {
        '&>div:first-child': {
          display: 'block !important',
        },
        '&>div': {
          display: 'none',
        },
      },

      '&>div:first-child': {
        marginLeft: 'auto',
        paddingLeft: '44px',
      },

      '&>div:nth-child(2)': {
        '&>button:first-child': {
          position: 'absolute',
          left: '10px',
        },
        '&>div': {
          display: 'none',
        },
      },

      '& button:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .PrivatePickersYear-root button': {
      color: theme.color['text/onSurface100/default'],
      borderRadius: theme.borderRadius['borderRadius/none'],
      margin: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']}  ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/200']}`,
      fontSize: '14px',
      width: '93px',
      height: '40px',
      '&:hover': {
        border: `1px solid ${theme.color['border/onSurface100/action/tertiary']} !important`,
        borderRadius: theme.borderRadius['borderRadius/none'],
        backgroundColor: theme.color['bg/surface100/default'],
      },
      '&:focus': {
        outline: `4px solid ${theme.color['border/onSurface100/focus']}`,
        backgroundColor: 'transparent',
      },
      '&:active': {
        backgroundColor: theme.color['bg/surfaceSecondary/default'],
        color: theme.color['text/onSurfaceSecondary/default'],
      },
      '&.Mui-disabled': {
        color: theme.color['text/onSurface100/disabled'],
      },
      '&.Mui-selected': {
        backgroundColor: `${theme.color['bg/surfaceSecondary/default']} !important`,
        borderRadius: theme.borderRadius['borderRadius/none'],
        color: theme.color['text/onSurfaceSecondary/default'],
      },
    },
    '& .MuiDialogActions-root': {
      borderTop: `1px solid ${theme.color['border/onSurface100/default']}`,
      flexFlow: 'column-reverse',
      padding: theme.layoutSpacing['spacing/400'],
      '& button': {
        width: '100%',
        margin: theme.layoutSpacing['spacing/000'],
        borderRadius: theme.borderRadius['borderRadius/none'],
        textTransform: 'none',
        '&:focus': {
          outline: `4px solid ${theme.color['border/onSurface100/focus']}`,
        },

        '&:first-child': {
          color: theme.color['text/onSurface100/default'],
          border: `1px solid ${theme.color['border/onSurface100/action/tertiary']}`,
          marginTop: theme.layoutSpacing['spacing/400'],
          '&:hover': {
            backgroundColor: theme.color['bg/surface100/hover'],
          },
          '&:active': {
            backgroundColor: 'transparent',
            color: theme.color['text/onSurfaceCurrent/active'],
          },
        },

        '&:nth-child(2)': {
          color: theme.color['text/onSurfacePrimary/default'],
          backgroundColor: theme.color['bg/surfacePrimary/default'],
          '&:hover': {
            backgroundColor: theme.color['bg/surfacePrimary/hover'],
          },
          '&:active': {
            backgroundColor: theme.color['bg/surfacePrimary/active'],
          },
        },
      },
    },
    '& .PrivatePickersSlideTransition-root': {
      minHeight: '244px',

      '&>div:first-child': {
        '&>div:first-child': {
          marginTop: theme.layoutSpacing['spacing/200'],
        },
        '&>div:last-child': {
          marginBottom: theme.layoutSpacing['spacing/200'],
        },
      },
    },
    '& .MuiYearPicker-root': {
      minHeight: '284px',
      padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']}`,
    },
  },
  dayRoot: {
    color: theme.color['text/onSurface100/default'],
    borderRadius: theme.borderRadius['borderRadius/none'],
    '&:hover': {
      border: `1px solid ${theme.color['border/onSurface100/action/tertiary']} !important`,
      borderRadius: theme.borderRadius['borderRadius/none'],
      backgroundColor: theme.color['bg/surface100/default'],
    },
    '&:focus': {
      outline: `4px solid ${theme.color['border/onSurface100/focus']}`,
      zIndex: 1,
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: theme.color['bg/surfaceSecondary/default'],
      color: theme.color['text/onSurfaceSecondary/default'],
    },
    '&.Mui-disabled': {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  today: {
    borderColor: `${theme.color['border/onSurfaceCurrent/default']} !important`,
    borderRadius: theme.borderRadius['borderRadius/none'],
    backgroundColor: `${theme.color['bg/surface100/default']} !important`,
  },
  daySelected: {
    backgroundColor: `${theme.color['bg/surfaceSecondary/default']} !important`,
    borderRadius: theme.borderRadius['borderRadius/none'],
    color: `${theme.color['text/onSurfaceSecondary/default']} !important`,
  },
  dayOutsideMonth: {
    color: theme.color['text/onSurfaceCurrent/disabled'],
  },
  dayNotSelected: {
    color: `${theme.color['text/onSurface100/default']} !important`,
    backgroundColor: `${theme.color['bg/surface100/default']} !important`,
  },
  dayInRange: {
    backgroundColor: `${theme.color['bg/surface200/default']} !important`,
  },
  backdrop: {
    backgroundColor: theme.color['bg/backdrop/dark'],
  },
}));

export default useStyles;
