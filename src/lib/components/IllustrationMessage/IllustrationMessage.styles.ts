import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'IllustrationMessage' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  rootVertical: {
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '24%',
    display: 'flex',
    justifyContent: 'center',
  },
  imageWrapperVertical: {
    width: '100%',
    marginBottom: theme.layoutSpacing['spacing/400'],
  },
  contentWrapper: {
    width: '76%',
    paddingRight: theme.layoutSpacing['spacing/300'],
  },
  contentWrapperVertical: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  header: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  description: {
    marginTop: theme.layoutSpacing['spacing/000'],
    marginBottom: theme.layoutSpacing['spacing/000'],
  },
  action: {
    display: 'flex',
    marginTop: theme.layoutSpacing['spacing/400'],
    flexWrap: 'wrap',
    gap: theme.layoutSpacing['spacing/400'],
  },
  actionVertical: {
    justifyContent: 'center',
  },
  actionXs: {
    justifyContent: 'strech',
    width: '100%',

    '&>div': {
      flex: '1 auto',
      minWidth: `calc(50% - ${theme.layoutSpacing['spacing/300']})`,
    },
  },
  buttonXs: {
    width: '100%',
  },
}));

export default useStyles;
