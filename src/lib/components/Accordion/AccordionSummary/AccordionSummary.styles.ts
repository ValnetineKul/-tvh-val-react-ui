import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = { surface: Surface };

const useStyles = makeStyles<Props, 'expanded'>({ name: 'AccordionSummary' })((theme, { surface }, classes) => ({
  title: {
    paddingRight: theme.layoutSpacing['spacing/400'],
    textAlign: 'left',
  },

  summary: {
    minHeight: 'auto',
    width: '100%',
    padding: theme.layoutSpacing['spacing/400'],
    paddingBottom: `calc(${theme.layoutSpacing['spacing/400']} - 1px)`,
    transition: 'auto',
    borderBottom: 'none',

    [`&.${classes.expanded}`]: {
      minHeight: 'auto',
    },
  },
  expanded: {
    [`&.${classes.expanded}`]: {
      margin: theme.layoutSpacing['spacing/000'],
    },
  },

  content: {
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/000'],
    transition: 'auto',
  },

  expandIcon: {
    padding: theme.layoutSpacing['spacing/000'],
    transform: 'none',
    transition: 'auto',
    color: theme.color[`icon/onSurface${surface}/action/default`],

    [`&.${classes.expanded}`]: {
      transform: 'none',
    },
  },

  badge: {
    marginRight: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
