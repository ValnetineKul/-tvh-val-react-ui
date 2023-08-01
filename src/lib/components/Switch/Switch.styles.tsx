import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'spaceBetween' | 'disabled' | 'checked' | 'track' | 'label'>({ name: 'Switch' })(
  (theme, _, classes) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: theme.layoutSpacing['spacing/300'],
      margin: theme.layoutSpacing['spacing/000'],
      [`&.${classes.spaceBetween}`]: {
        justifyContent: 'space-between',
      },
    },
    label: {
      [`&.${classes.disabled} .${classes.label}`]: {
        color: theme.color['text/onSurfaceCurrent/disabled'],
      },
    },
    spaceBetween: {},
    switch: {
      width: theme.layoutSpacing['spacing/450'],
      height: theme.layoutSpacing['spacing/400'],
      padding: theme.layoutSpacing['spacing/000'],
      '&:focus-within': {
        boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
        borderRadius: theme.borderRadius['borderRadius/round/150'],
      },
    },
    switchBase: {
      padding: theme.layoutSpacing['spacing/000'],
      transitionDuration: '300ms',
      border: '2px solid',
      borderColor: theme.color['border/onSurfaceCurrent/default'],
      color: theme.color['bg/surface100/default'],
      [`&.${classes.disabled}`]: {
        borderColor: theme.color['border/onSurfaceCurrent/disabled'],
      },
      [`&.${classes.checked}`]: {
        transform: `translateX(${theme.layoutSpacing['spacing/300']})`,
        color: theme.color['bg/surface100/default'],
        borderColor: theme.color['bg/surfacePrimary/default'],
        [`& + .${classes.track}`]: {
          backgroundColor: theme.color['bg/surfacePrimary/default'],
          opacity: 1,
          border: 0,
        },
        [`&.${classes.disabled} + .${classes.track}`]: {
          backgroundColor: theme.color['bg/disabled'],
        },
      },
      [`&.${classes.disabled} + .${classes.track}`]: {
        borderColor: theme.color['border/onSurfaceCurrent/disabled'],
        opacity: 1,
      },
    },
    disabled: {},
    checked: {
      border: 'none',
      padding: theme.layoutSpacing['spacing/100'],
    },
    thumb: {
      width: theme.layoutSpacing['spacing/350'],
      height: theme.layoutSpacing['spacing/350'],
      color: theme.color['bg/surface100/default'],
      boxShadow: 'none',
    },
    track: {
      borderRadius: theme.borderRadius['borderRadius/round/150'],
      border: '2px solid ',
      borderColor: theme.color['border/onSurfaceCurrent/default'],
      backgroundColor: theme.color['bg/surface100/default'],
      transition: 'none',
      opacity: 1,
    },
  })
);

export default useStyles;
