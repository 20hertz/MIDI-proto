import { useEffect } from 'react';
import { SAMPLES_URL, SAMPLE_NAMES } from '../constants';
import makeSampler, { SamplesMap } from '../models/sampler';
import { makeSamplesMap } from '../models/samples-map';
import { useSamplerContext } from '../services/sampler';
import { getSampler, Sample, useSamplesContext } from '../services/samples';

export const useDefaultSamples = () => {
  const {
    dispatch,
    setFetchHasError,
    setSamplesAreLoading,
  } = useSamplesContext();

  const { currentOctave } = useSamplerContext();

  const createSampler = async () => {
    setSamplesAreLoading(true);
    try {
      const initialSamples = await fetchSamples();
      const initialSampleMap = makeSamplesMap(initialSamples, currentOctave);
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

const fetchSample = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
};

const fetchSamples = async () =>
  Promise.all(
    SAMPLE_NAMES.map(async name => {
      const arrayBuffer = await fetchSample(SAMPLES_URL + name);
      return {
        fileName: name,
        arrayBuffer,
      };
    })
  );
