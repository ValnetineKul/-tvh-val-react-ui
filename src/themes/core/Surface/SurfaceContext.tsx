import React from 'react';

export type Surface =
  | '100'
  | '150'
  | '200'
  | '300'
  | 'Primary'
  | 'Secondary'
  | 'Error'
  | 'Info'
  | 'Neutral'
  | 'Success'
  | 'Warning';

export interface SurfaceContextProps {
  color: Surface;
}
const SurfaceContext = React.createContext<SurfaceContextProps | null>(null);
export default SurfaceContext;
