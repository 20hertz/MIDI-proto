import { useEffect } from 'react';
import { SAMPLES_URL, SAMPLE_NAMES } from '../constants';
import makeSampler from '../models/sampler';
import { makeSamplesTable } from '../models/samples-map';
import { useSamplerContext } from '../services/sampler';
import { getSampler, Sample, useSamplesContext } from '../services/samples';

export const useDefaultSamples = () => {
  const {
    dispatch,
    setFetchHasError,
    setSamplesAreLoading,
  } = useSamplesContext();

  const { currentOctave } = useSamplerContext();

  const createInitialSampler = async () => {
    setSamplesAreLoading(true);
    try {
      const initialSamples = await fetchSamples();
      const initialSamplesTable = makeSamplesTable(
        initialSamples,
        currentOctave
      );
      const sampler = await makeSampler(initialSamplesTable);
      dispatch(getSampler(sampler));
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  useEffect(() => {
    createInitialSampler();
  }, [SAMPLES_URL]);
};

const fetchSample = async (url: string) => {
  const response = await fetch(url);
  return await response.arrayBuffer();
};

const fetchSamples = async () =>
  Promise.all(
    SAMPLE_NAMES.map<Promise<Sample>>(async name => {
      const arrayBuffer = await fetchSample(SAMPLES_URL + name);
      return {
        fileName: name,
        arrayBuffer,
      };
    })
  );
