import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Logo' })((theme) => ({
  root: {
    '&:not(:disabled):hover': {
      backgroundColor: 'transparent',
    },
    '&:not(:disabled):active': {
      backgroundColor: 'transparent',
    },
  },
  sizeSm: {
    height: 24,
  },
  sizeMd: {
    height: 40,
  },
  withSubLogo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    rowGap: theme.layoutSpacing['spacing/100'],
  },
  sizeCompanySm: {
    height: 14,
  },
  sizeCompanyMd: {
    height: 24,
  },
  sizeSubLogoSm: {
    height: 8,
  },
  sizeSubLogoMd: {
    height: 14,
  },
}));

export default useStyles;
