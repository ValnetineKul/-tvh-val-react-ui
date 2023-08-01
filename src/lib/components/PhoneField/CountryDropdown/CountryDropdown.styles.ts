import { makeStyles } from '../../../../themes/core';
import { surface } from './CountryDropdown.constants';

const useStyles = makeStyles({ name: 'CountryDropDown' })((theme) => ({
  root: {
    position: 'absolute',
    zIndex: 2,
    width: `calc(${theme.layoutSpacing['spacing/550']} + ${theme.layoutSpacing['spacing/300']})`,
    height: theme.layoutSpacing['spacing/550'],
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    height: `calc(100% - ${theme.layoutSpacing['spacing/100']})`,
    width: `calc(100% - ${theme.layoutSpacing['spacing/100']})`,
    marginLeft: '1px',
    color: theme.color[`icon/onSurface${surface}/default` as const],

    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
    },
  },
  selectError: {
    backgroundColor: 'transparent',
  },
  flagIcon: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
