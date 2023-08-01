import React from 'react';

import SurfaceContext from './SurfaceContext';

const useSurface = () => {
  const context = React.useContext(SurfaceContext);
  if (context === null) {
    throw Error('The SurfaceContext context is null. You need to have at least one Surface component in the tree');
  }

  return context;
};

export default useSurface;
