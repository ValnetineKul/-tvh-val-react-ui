import type { Surface } from '../../../../../themes/core';
import { makeStyles } from '../../../../../themes/core';
import { skeletonAnimationStyles } from '../helper';

type Props = {
  onSurface: Surface;
  width: string | number;
  height: string | number;
};

const useStyles = makeStyles<Props>({
  name: 'SkeletonArea',
})((theme, { onSurface, width, height }) => ({
  root: {
    width,
    height,
    ...skeletonAnimationStyles(
      onSurface === '200' ? theme.color['bg/surface300/default'] : theme.color['bg/surface200/default'],
      onSurface === '200' ? theme.color['bg/surface400/default'] : theme.color['bg/surface150/default']
    ),
  },
}));

export default useStyles;
