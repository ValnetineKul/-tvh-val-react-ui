import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'PasteToUpload' })((theme) => ({
  resetList: {
    listStyle: 'none',
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/000'],
  },

  imageList: {
    marginTop: theme.layoutSpacing['spacing/400'],
    display: 'flex',
    flexFlow: 'wrap',
    gap: theme.layoutSpacing['spacing/300'],
  },

  imageListItem: {
    position: 'relative',
    width: `calc((100% - 3*${theme.layoutSpacing['spacing/300']}) / 4)`,
  },

  dialogImage: {
    display: 'flex',
    width: '100%',
    height: 'fit-content',
    justifyContent: 'center',
  },

  dialogImageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.layoutSpacing['spacing/400'],
  },

  dialogImageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.layoutSpacing['spacing/300'],
  },

  dialogImageListItem: {
    width: 80,
    height: 80,
  },
}));

export default useStyles;
