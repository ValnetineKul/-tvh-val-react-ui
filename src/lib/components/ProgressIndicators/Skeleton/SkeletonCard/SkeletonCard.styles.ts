import { makeStyles } from '../../../../../themes/core';

type Props = {
  width: string | number;
};

const useStyles = makeStyles<Props>({
  name: 'SkeletonCard',
})((theme, { width }) => ({
  root: {
    border: `1px solid ${theme.color['border/onSurfaceCurrent/disabled']}`,
    width,
  },
}));

export default useStyles;
