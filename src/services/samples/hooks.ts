import { useEffect, useReducer, useState } from 'react';
import { reducer } from './reducer';
import fetchSamples from './fetch';
import { BUCKET_URL } from '../../constants';
import { getSamples } from './actions';

export const useInitSamples = () => {
  const [fetchHasError, setFetchHasError] = useState(false);
  const [samples, dispatch] = useReducer(reducer, []);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);

  const loadInitialSamples = async () => {
    setSamplesAreLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      dispatch(getSamples(sampleBuffers));
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  useEffect(() => {
    loadInitialSamples();
  }, [BUCKET_URL]);

  return {
    dispatch,
    fetchHasError,
    samples,
    samplesAreLoading,
    setFetchHasError,
    setSamplesAreLoading,
  };
};
