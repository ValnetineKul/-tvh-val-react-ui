import React from 'react';
import useStyles from './GridVisualizer.styles';

const GridVisualizer = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
        <div className={classes.item} key={number} />
      ))}
    </div>
  );
};

export default GridVisualizer;
