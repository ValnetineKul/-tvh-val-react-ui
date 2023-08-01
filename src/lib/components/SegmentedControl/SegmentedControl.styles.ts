import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'SegmentedControl' })((theme) => ({
  fieldset: {
    margin: theme.layoutSpacing['spacing/000'],
    padding: theme.layoutSpacing['spacing/000'],
    border: 'none',
    font: 'inherit',
    verticalAlign: 'baseline',
  },

  controls: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },

  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
}));

export default useStyles;
