import { makeStyles } from '../../../themes/core';
import { surface } from './Select.constants';

type Props = {
  infoMessageHeight: number;
};

const useStyles = makeStyles<Props, 'menuItem' | 'labelWithStartIcon' | 'labelShortestWithStartIcon'>({
  name: 'Select',
})((theme, { infoMessageHeight }, classes) => ({
  divider: {
    marginTop: theme.layoutSpacing['spacing/000'],
    marginBottom: theme.layoutSpacing['spacing/000'],
  },

  title: {
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']} ${theme.layoutSpacing['spacing/300']}`,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
    color: theme.color[`text/onSurface${surface}/secondary` as const],
  },

  titleRoot: {
    width: '100%',
  },

  item: {
    width: '100%',
    [`&.Mui-focusVisible .${classes.menuItem}`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
  },

  itemWithAutoHighlight: {
    [`&.Mui-focused .${classes.menuItem}`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
  },

  menuItem: {},

  selectAll: {
    flexDirection: 'column',
  },

  heading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  multipleInputRoot: {
    flexWrap: 'wrap',
  },

  listboxDesktop: {
    maxHeight: 320,
  },

  paperSurface: {
    boxShadow: theme.shadow['shadow/300'],
  },

  formControl: {
    width: 240,
    [`& .${classes.labelWithStartIcon}`]: {
      // 8px select padding left + 32 px svg width + 8px svg margin right + 8px select padding right
      // + (24 px svg width + 8px svg margin right) = 88px
      width: `calc(100% - (4 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/450']})) !important`,
    },
    [`& .${classes.labelShortestWithStartIcon}`]: {
      // 8px select padding left + 32 px svg width + 32 px svg width + 8px svg margin right
      // + 8px select padding right + (24 px svg width + 8px svg margin right) = 120px
      width: `calc(100% - (4 * ${theme.layoutSpacing['spacing/300']} + 2 * ${theme.layoutSpacing['spacing/500']} + ${theme.layoutSpacing['spacing/450']})) !important`,
    },
  },
  labelWithStartIcon: {},
  labelShortestWithStartIcon: {},

  fullWidthLabel: {
    width: '100%',
  },

  label: {
    // 8px select padding left + 32 px svg width + 8px svg margin right + 8px select padding right = 56px
    width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/500']}))`,
  },

  labelShortest: {
    // 8px select padding left + 32 px svg width + 32 px svg width + 8px svg margin right + 8px select padding right = 88px
    width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + 2 * ${theme.layoutSpacing['spacing/500']}))`,
  },

  input: {
    flex: '3 !important',
  },

  modalPaper: {
    overflow: 'hidden',
  },

  modalHeightWithSearch: {
    height: '95%',
    top: 'auto',
  },

  modalContainer: {
    height: 'auto',
  },

  modalTitle: {
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/400']}`,
  },

  popper: {
    width: '100% !important',
  },

  popperWithSearch: {
    top: '4px !important',
  },

  popperWithoutSearch: {
    // backdrop height + modal header height + header divider height - 4px mui inline style transform)
    top: 'calc(5vh + 40px + 1px - 4px) !important',
  },

  listbox: {
    paddingTop: theme.layoutSpacing['spacing/000'],
    paddingBottom: theme.layoutSpacing['spacing/000'],
    // force the listbox to take all the space available in maxHeight
    height: '95vh',
  },

  listboxMobileWithActionButton: {
    // 95vh modal height - 40px header - 48px search - 16px top and bottom paddings - 58px button with divider - infoMessage height
    maxHeight: `calc(95dvh - 40px - 48px - 16px - 58px - ${infoMessageHeight}px)`,
  },

  listboxMobileWithActionButtonWithoutSearch: {
    // 95vh modal height - 40px header - 58px button with divider - infoMessage height
    maxHeight: `calc(95dvh - 40px - 58px - ${infoMessageHeight}px)`,
  },

  listboxMobile: {
    // 95vh modal height - 40px header - 48px search - 16px top and bottom paddings - infoMessage height
    maxHeight: `calc(95dvh - 40px - 48px - 16px - ${infoMessageHeight}px)`,
  },

  listboxMobileWithFreeSolo: {
    // 95vh modal height - 40px header - 48px search - 16px top and bottom paddings - 50px freeSolo button with divider - infoMessage height
    maxHeight: `calc(95dvh - 40px - 48px - 16px - 50px - ${infoMessageHeight}px)`,
  },

  listboxMobileWithoutSearch: {
    // 95vh modal height - 40px header - infoMessage height
    maxHeight: `calc(95dvh - 40px - ${infoMessageHeight}px)`,
  },

  mobileRoot: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
  },

  hiddenMobileRoot: {
    display: 'none',
  },

  modalActionButton: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
  },

  modalActionItem: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export default useStyles;
