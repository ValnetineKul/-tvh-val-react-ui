import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'selected' | 'hover'>({ name: 'TableRow' })((theme, _, classes) => ({
  root: {
    [`&.${classes.hover}`]: {
      '&:hover > td': {
        backgroundColor: theme.color['bg/surface100/hover'],
      },
    },
    [`&.${classes.selected}`]: {
      '& > td': {
        backgroundColor: theme.color['bg/table/selected'],
      },
      '&:hover > td': {
        backgroundColor: theme.color['bg/table/selected'],
      },
    },
  },
  hover: {},
  selected: {},

  row: {
    cursor: 'pointer',
    '&:focus': {
      boxShadow: `inset 0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
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

  expandableCell: {
    width: '64px',
  },

  expandableContentCell: {
    padding: theme.layoutSpacing['spacing/000'],
    height: 'unset',
    backgroundColor: theme.color['bg/surface150/default'],
  },

  notExpandedContentCell: {
    borderBottom: 'none',
  },

  editActionsRoot: {
    display: 'flex',
    gap: theme.layoutSpacing['spacing/300'],
  },

  editActionCol: {
    minWidth: '150px',
  },
}));

export default useStyles;
