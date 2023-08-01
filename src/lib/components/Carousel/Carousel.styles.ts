import { makeStyles } from '../../../themes/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

const useStyles = makeStyles({ name: 'Carousel' })((theme) => ({
  root: {
    // reset swiper styles
    '*': {
      boxSizing: 'border-box',
    },
    position: 'relative',
  },

  container: {
    // 24px padding + 16px arrows height = 40px
    paddingBottom: `calc(${theme.layoutSpacing['spacing/450']} + ${theme.layoutSpacing['spacing/400']})`,
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.layoutSpacing['spacing/450'],
  },

  titleGap: {
    paddingLeft: theme.layoutSpacing['spacing/400'],
  },

  swiperSlide: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
