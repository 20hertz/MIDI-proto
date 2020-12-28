import { useEffect } from 'react';
import { SAMPLES_URL, SAMPLE_NAMES } from '../constants';
import makeSampler, { SamplesMap } from '../models/sampler';
import { makeSamplesMap } from '../models/samples-map';
import { useSamplerContext } from '../services/sampler';
import { getSampler, useSamplesContext } from '../services/samples';

export const useDefaultSamples = () => {
  const {
    dispatch,
    setFetchHasError,
    setSamplesAreLoading,
  } = useSamplesContext();

  const { currentOctave } = useSamplerContext();

  const createSampler = async () => {
    const initialSampleMap = makeSamplesMap(initialSamples, currentOctave);

    setSamplesAreLoading(true);
    try {
      const sampler = await makeSampler(initialSampleMap as SamplesMap);
      dispatch(getSampler(sampler));
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  useEffect(() => {
    createSampler();
  }, [SAMPLES_URL]);
};

const initialSamples = SAMPLE_NAMES.map(name => ({
  name,
  url: SAMPLES_URL + name,
}));
