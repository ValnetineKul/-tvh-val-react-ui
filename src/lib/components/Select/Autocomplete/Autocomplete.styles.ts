import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'labelWithStartIcon' | 'labelShortestWithStartIcon' | 'formControl' | 'fullWidth'>({
  name: 'Autocomplete',
})((theme, _params, classes) => ({
  root: {
    display: 'inline-block',
    width: 240,
    [`& .${classes.formControl}`]: {
      display: 'block',
      [`& .${classes.labelWithStartIcon}`]: {
        // 8px select padding left + 32 px svg width + 8px svg margin right + 8px select padding right
        // + (24 px svg width + 8px svg margin right) = 88px
        width: `calc(100% - (4 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/450']}))`,
      },
      [`& .${classes.labelShortestWithStartIcon}`]: {
        // 8px select padding left + 32 px svg width + 32 px svg width + 8px svg margin right
        // + 8px select padding right + (24 px svg width + 8px svg margin right) = 120px
        width: `calc(100% - (4 * ${theme.layoutSpacing['spacing/300']} + 2 * ${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/450']}))`,
      },
      [`&.${classes.fullWidth}`]: {
        width: '100%',
      },
    },
  },
  formControl: {},
  labelWithStartIcon: {},
  labelShortestWithStartIcon: {},

  fullWidth: {
    width: '100%',
  },

  input: {
    flex: '3 !important',
  },

  multipleInput: {
    minWidth: '20px !important',
  },

  fullWidthLabel: {
    width: '100%',
  },

  label: {
    // 8px select padding left + 32 px svg width + 8px svg margin right + 8px select padding right = 56px
    width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/500']}))`,
  },

  labelShortest: {
    // 8px select padding left + 32 px svg width + 32 px svg width + 8px svg margin right + 8px select padding right = 88px
    width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + 2 * ${theme.layoutSpacing['spacing/500']}))`,
  },

  autoComplete: {
    width: 'inherit !important',
  },

  noOptions: {
    color: 'inherit',
    padding: theme.layoutSpacing['spacing/400'],
    textAlign: 'center',
  },

  fullSpinner: {
    display: 'block',
  },

  infoMessage: {
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']}`,
  },
}));

export default useStyles;
