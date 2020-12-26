import { useEffect, useReducer, useState } from 'react';
import { reducer } from './reducer';
import { BUCKET_URL, Keys, SAMPLE_NAMES } from '../../constants';
import { getSampler } from './actions';
import makeSampler from '../../sampler';

export const defaultKit = Object.fromEntries(
  SAMPLE_NAMES.map((name, i) => [Object.values(Keys)[i], BUCKET_URL + name])
);

export const useInitSamples = () => {
  const [fetchHasError, setFetchHasError] = useState(false);
  const [sampler, dispatch] = useReducer(reducer, []);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);

  const createSampler = async () => {
    setSamplesAreLoading(true);
    try {
      const sampler = await makeSampler(defaultKit);
      dispatch(getSampler(sampler));
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  useEffect(() => {
    createSampler();
  }, [defaultKit]);

  return {
    dispatch,
    fetchHasError,
    sampler,
    samplesAreLoading,
    setFetchHasError,
    setSamplesAreLoading,
  };
};
