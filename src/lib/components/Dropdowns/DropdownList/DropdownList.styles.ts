import { makeStyles } from '../../../../themes/core';

type Props = {
  maxListHeight: number;
};

const useStyles = makeStyles<Props>({ name: 'DropdownList' })((theme, props) => ({
  root: {
    borderRadius: theme.borderRadius['borderRadius/none'],
    boxShadow: theme.shadow['shadow/300'],
    display: 'inline-block',
    maxWidth: 320,
    minWidth: 120,
    zIndex: 1292, // TODO Change to theme zIndex value as it will be added.
  },
  surfaceRoot: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']}`,
  },
  header: {
    padding: theme.layoutSpacing['spacing/400'],
  },
  checkbox: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    '& label': {
      width: '100%',
    },
  },
  checkboxLabel: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  search: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
  },
  virtualList: {
    height: 'unset !important', // TODO is there a way to avoid !important
    maxHeight: props.maxListHeight,
  },
  virtualizedListWrapper: {
    '& > ul': {
      marginBottom: theme.layoutSpacing['spacing/300'],
    },
  },
  list: {
    overflowY: 'auto',
    maxHeight: 312,
    paddingTop: theme.layoutSpacing['spacing/000'],
    paddingBottom: theme.layoutSpacing['spacing/000'],
  },
  listWrapper: {
    paddingBottom: theme.layoutSpacing['spacing/300'],
  },
  dynamicList: {
    maxHeight: props.maxListHeight,
  },
  message: {
    textAlign: 'center',
    padding: theme.layoutSpacing['spacing/400'],
    justifyContent: 'center',
    whiteSpace: 'pre-wrap',
  },
  error: {
    padding: theme.layoutSpacing['spacing/400'],
  },
  fullSpinner: {
    minWidth: 220,
    minHeight: 48,
    display: 'block',
  },
  modalHeightWithSearch: {
    height: '95%',
    top: 'auto',
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
  modalMenuList: {
    maxHeight: '100%',
  },
  modalScrollList: {
    overflowY: 'auto',
    height: '100%',
  },
  modalContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  },
  modalActionItem: {
    marginTop: 'auto',
  },
  actionItem: {
    paddingBottom: theme.layoutSpacing['spacing/300'],
  },
  modalContainer: {
    height: 'auto',
  },
}));

export default useStyles;
