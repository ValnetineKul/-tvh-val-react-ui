import { useTheme } from '@mui/material/styles';
import { createMakeAndWithStyles } from 'tss-react';
import useMediaQuery from '@mui/material/useMediaQuery';

const { makeStyles, withStyles } = createMakeAndWithStyles({ useTheme });

export { useTheme, makeStyles, withStyles, useMediaQuery };
