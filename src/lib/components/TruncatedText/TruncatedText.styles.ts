import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'TruncatedText' })(() => ({
  truncatedText: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
}));

export default useStyles;
