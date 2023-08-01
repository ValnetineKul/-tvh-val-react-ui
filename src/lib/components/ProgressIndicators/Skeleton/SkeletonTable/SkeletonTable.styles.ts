import type { Surface } from '../../../../../themes/core';
import { makeStyles } from '../../../../../themes/core';
import { skeletonAnimationStyles } from '../helper';

type Props = {
  onSurface: Surface;
};

const useStyles = makeStyles<Props>({
  name: 'SkeletonTable',
})((theme, { onSurface }) => ({
  tableHead: {
    ...skeletonAnimationStyles(theme.color['bg/surface300/default'], '#A0A0A0'),
    width: '100%',
  },
  tableBody: {
    ...skeletonAnimationStyles(
      onSurface === '200' ? theme.color['bg/surface300/default'] : theme.color['bg/surface200/default'],
      onSurface === '200' ? theme.color['bg/surface400/default'] : theme.color['bg/surface150/default']
    ),
    width: '100%',
  },
  narrowColumn: {
    width: '56px',
  },
}));

export default useStyles;
