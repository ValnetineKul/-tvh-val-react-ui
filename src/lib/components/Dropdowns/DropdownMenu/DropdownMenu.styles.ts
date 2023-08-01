import { makeStyles } from '../../../../themes/core';

type Props = {
  maxListHeight: number;
};

const useStyles = makeStyles<Props>({ name: 'DropdownMenu' })((theme, props) => ({
  popperRoot: {
    zIndex: 1291,
  },
  mainSurface: {
    marginTop: theme.layoutSpacing['spacing/200'],
    marginBottom: theme.layoutSpacing['spacing/200'],
  },
  menu: {
    borderRadius: theme.borderRadius['borderRadius/none'],
    boxShadow: theme.shadow['shadow/300'],
    display: 'block',
    overflowY: 'auto',
    maxHeight: 320,
    maxWidth: 320,
    minWidth: 120,
  },
  dynamicList: {
    maxHeight: props.maxListHeight,
  },
  menuList: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/000']}`,
  },
  subMenu: {
    zIndex: 1300,
    marginTop: theme.layoutSpacing['spacing/000'],
    '&[x-placement*="left"]': {
      clipPath: 'inset(-24px -1px -24px -24px)',
    },
    '&[x-placement*="right"]': {
      clipPath: 'inset(-24px -24px -24px -1px)',
    },
  },
  mobileSubMenu: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  fullSpinner: {
    display: 'block',
  },
  emptySpinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mobileEmptySpinnerContainer: {
    height: 72,
  },
  modalAutoHeight: {
    height: 'auto',
    maxHeight: '95vh',
    top: 'auto',
  },
  modalTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  title: {
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/400']}`,
  },
  modalContainer: {
    height: 'auto',
  },
  modalScrollList: {
    overflowY: 'auto',
  },
  mobileMenuList: {
    paddingTop: theme.layoutSpacing['spacing/000'],
    paddingBottom: theme.layoutSpacing['spacing/000'],
    height: '100%',
    overflowY: 'auto',
  },
  modalLabel: {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    marginRight: theme.layoutSpacing['spacing/300'],
    marginLeft: theme.layoutSpacing['spacing/300'],
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  hiddenContentFromScreenReader: {
    visibility: 'hidden',
  },
}));

export default useStyles;
