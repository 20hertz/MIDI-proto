import { useEffect, useReducer, useState } from 'react';
import { reducer } from './reducer';
import { DEFAULT_KIT } from '../../constants';
import { getSampler } from './actions';
import makeSampler, { Sampler } from '../../sampler';

export const useInitSamples = () => {
  const [fetchHasError, setFetchHasError] = useState(false);
  const [sampler, dispatch] = useReducer(reducer, []);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);

  const createSampler = async () => {
    setSamplesAreLoading(true);
    try {
      const sampler = await makeSampler(DEFAULT_KIT);
      dispatch(getSampler(sampler));
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  useEffect(() => {
    createSampler();
  }, [DEFAULT_KIT]);

  return {
    dispatch,
    fetchHasError,
    sampler,
    samplesAreLoading,
    setFetchHasError,
    setSamplesAreLoading,
  };
};
