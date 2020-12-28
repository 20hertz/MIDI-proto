import { createContext, useContext, useState } from 'react';
import { Octave, SamplerContextType } from './types';

export const SamplerContext = createContext<SamplerContextType>(undefined);

export const useSamplerContext = () => {
  const store = useContext(SamplerContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplerContext` outside of a SamplerProvider'
    );
  }

  return store;
};

export const useSamplerStore = () => {
  const [currentOctave] = useState(4 as Octave);
  return { currentOctave };
};
