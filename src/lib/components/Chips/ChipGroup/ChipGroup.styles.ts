import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'ChipGroup' })((theme) => ({
  root: {
    listStyle: 'none',
    marginTop: theme.layoutSpacing['spacing/000'],
    marginBottom: theme.layoutSpacing['spacing/000'],
    paddingLeft: theme.layoutSpacing['spacing/000'],
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: theme.layoutSpacing['spacing/300'],
  },

  fillContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gridAutoRows: 'auto',
    gridGap: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
