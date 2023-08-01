import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'primaryButtonSm' | 'fullWidth'>({
  name: 'SearchField',
})((theme, _, classes) => ({
  root: {
    display: 'flex',
  },

  inputElement: {
    position: 'relative',
    // Because we already use !important in TextField
    paddingLeft: `${theme.layoutSpacing['spacing/400']} !important`,
  },

  inputElementPrimaryXs: {
    // Because we already use !important in TextField
    paddingTop: `${theme.layoutSpacing['spacing/300']} !important`,
    paddingBottom: `${theme.layoutSpacing['spacing/300']} !important`,
  },

  variantPrimary: {
    paddingRight: `${theme.layoutSpacing['spacing/400']} !important`,
  },

  variantPrimaryFilled: {
    /**
     * Because clear button is positioned absolutely we need to set padding
     * more than 32px (spacing/500). So that's why we stacking multiple spacings
     * 32px (clear button) + 16px (button's left margin)
     */
    paddingRight: `calc(${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/400']}) !important`,
  },

  variantSecondary: {
    // 32px (search button) + 16px (button's right margin)
    paddingRight: `${`calc(${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/400']})`} !important`,
  },

  variantSecondaryFilled: {
    // 32px (clear button) + 32px (search button) + 16px (button's left margin) + 8px (between buttons)
    paddingRight: `${`calc(${theme.layoutSpacing['spacing/500']} * 2 + ${theme.layoutSpacing['spacing/400']} + ${theme.layoutSpacing['spacing/300']})`} !important`,
  },

  input: {
    paddingRight: `${theme.layoutSpacing['spacing/000']} !important`,
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: theme.layoutSpacing['spacing/000'],
    },
  },

  inputPrimaryFilled: {
    marginRight: `-${theme.layoutSpacing['spacing/500']}`,
  },

  inputSecondaryFilled: {
    marginRight: `-${theme.layoutSpacing['spacing/525']}`,
  },

  label: {
    paddingLeft: theme.layoutSpacing['spacing/000'],
    paddingRight: `${theme.layoutSpacing['spacing/400']}`,
  },

  adornedEnd: {
    position: 'absolute',
    right: theme.layoutSpacing['spacing/350'],
    top: '50%',
    transform: 'translateY(-50%)',
  },

  primaryButton: {
    whiteSpace: 'nowrap',
    [`&.${classes.primaryButtonSm}`]: {
      left: `-${theme.layoutSpacing['spacing/200']}`,
    },
  },

  secondarySearchButton: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },

  fullWidth: {},
  primaryButtonSm: {},
}));

export default useStyles;
