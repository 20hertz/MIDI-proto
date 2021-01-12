import { createContext, useContext, useReducer, useState } from 'react';
import { Octave, SamplerContextType } from './types';
import { reducer } from './reducer';

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
  const [sampler, samplerDispatch] = useReducer(reducer, undefined);
  return { currentOctave, sampler, samplerDispatch };
};
