import { makeStyles } from '../../../../themes/core';
import { surface } from '../Select.constants';

const useStyles = makeStyles({
  name: 'StartAdornment',
})((theme) => ({
  multipleValueIndicator: {
    marginRight: theme.layoutSpacing['spacing/300'],
  },
  disabledInputAdornment: {
    color: theme.color[`text/onSurface${surface}/disabled` as const],
  },
  multipleInputAdornment: {
    maxWidth: '30%',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default useStyles;
