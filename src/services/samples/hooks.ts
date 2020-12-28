import { createContext, useContext, useReducer, useState } from 'react';
import { Octave } from '../sampler';
import { reducer } from './reducer';
import { SamplesContextType } from './types';

export const SamplesContext = createContext<SamplesContextType>(undefined);

export const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

export const useSamplesStore = () => {
  const [fetchHasError, setFetchHasError] = useState(false);
  const [sampler, dispatch] = useReducer(reducer, undefined);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);

  return {
    dispatch,
    fetchHasError,
    sampler,
    samplesAreLoading,
    setFetchHasError,
    setSamplesAreLoading,
  };
};
