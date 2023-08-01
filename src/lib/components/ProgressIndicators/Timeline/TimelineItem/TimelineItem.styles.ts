import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles({ name: 'TimelineItem' })((theme) => ({
  root: {
    display: 'flex',
  },
  rootHorizontal: {
    flexFlow: 'column',
    alignItems: 'center',
  },
  rootVertical: {
    flexFlow: 'row',
    alignItems: 'flex-start',
    padding: `${theme.layoutSpacing['spacing/500']} 0`,
  },
  rootVerticalFirst: {
    paddingTop: theme.layoutSpacing['spacing/200'],
  },
  rootVerticalLast: {
    paddingBottom: theme.layoutSpacing['spacing/000'],
  },
  rootReversedHorizontal: {
    flexFlow: 'column-reverse',
  },
  rootReversedVertical: {
    flexFlow: 'row-reverse',
  },
  iconRoot: {
    display: 'flex',
    justifyContent: 'center',
    width: `calc( ${theme.layoutSpacing['spacing/400']} + 3px)`,
    flexShrink: 0,
    height: theme.layoutSpacing['spacing/400'],
    transform: 'skewX(-10deg)',
    backgroundColor: theme.color['bg/disabled'],
    zIndex: 2,
  },
  iconRootCompleted: {
    backgroundColor: theme.color['bg/surfaceSuccess/default'],
  },
  iconRootWarning: {
    backgroundColor: theme.color['bg/surfaceWarning/default'],
  },
  icon: {
    transform: 'skewX(10deg)',
    color: theme.color['icon/onSurface100/default'],
  },
  iconWarning: {
    color: theme.color['icon/warning'],
  },
  iconCompleted: {
    color: theme.color['icon/success'],
  },
  tagReversedRoot: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  tagText: {
    margin: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
  },
  textRoot: {
    display: 'flex',
    flexFlow: 'column',
  },
  textRootHorizontal: {
    alignItems: 'center',
    marginTop: theme.layoutSpacing['spacing/300'],
    textAlign: 'center',
  },
  textRootVertical: {
    alignItems: 'flex-start',
    marginLeft: `calc(${theme.layoutSpacing['spacing/300']} + 3px)`,
    marginTop: `-${theme.layoutSpacing['spacing/200']}`,
  },
  textRootReversedHorizontal: {
    flexFlow: 'column-reverse',
  },
  textRootReversedVertical: {
    alignItems: 'flex-end',
    marginRight: `calc(${theme.layoutSpacing['spacing/300']} + 3px)`,
    marginLeft: theme.layoutSpacing['spacing/000'],
  },
  description: {
    marginTop: theme.layoutSpacing['spacing/300'],
  },
  descriptionReversedHorizontal: {
    marginBottom: theme.layoutSpacing['spacing/300'],
    marginTop: theme.layoutSpacing['spacing/000'],
  },
  descriptionReversedVertical: {
    textAlign: 'right',
  },
}));

export default useStyles;
