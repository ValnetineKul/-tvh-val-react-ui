import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'StatusTag' })((theme) => ({
  root: {
    display: 'inline-flex',
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

export default useStyles;
