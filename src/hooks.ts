import { useEffect } from 'react';
import JSZip from 'jszip';
import { SAMPLES_URL, SAMPLE_NAMES } from './constants';
import makeSampler from './models/sampler';
import { makeSamplesTable } from './models/samples-map';
import { useSamplerContext } from './services/sampler';
import { getSampler, Sample, useSamplesContext } from './services/samples';

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

const LOCAL_URL = '/google-drive/';
const PATH = 'uc?id=';
const ID = '10ZKzj_ihTSxDvnk-Yt9QE61vaD-q4d-v';
const request = new Request(LOCAL_URL + PATH + ID, { redirect: 'follow' });

export const useSamplesFetcher = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();
  const { currentOctave } = useSamplerContext();
  const getRemoteSamples = async () => {
    setSamplesAreLoading(true);
    try {
      const response = await fetch(request);
      const blob = await response.blob();
      const { files } = await JSZip.loadAsync(blob);

      const remoteSamples = await Promise.all(
        Object.keys(files).map(
          filename =>
            new Promise<Sample>(async resolve => {
              const fileData = await files[filename].async('arraybuffer');
              resolve({
                fileName: filename,
                arrayBuffer: fileData,
              });
            })
        )
      );

      const samplesTable = makeSamplesTable(remoteSamples, currentOctave);
      const sampler = await makeSampler(samplesTable);
      dispatch(getSampler(sampler));
    } catch (e) {
      console.error(e);
    }
    setSamplesAreLoading(false);
  };
  return { getRemoteSamples };
};
