import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'FileUploadItem' })((theme) => ({
  root: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    gap: theme.layoutSpacing['spacing/100'],
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    marginTop: theme.layoutSpacing['spacing/300'],
    alignItems: 'center',
  },
  inlineMessage: {
    margin: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']}`,
  },
}));

export default useStyles;
