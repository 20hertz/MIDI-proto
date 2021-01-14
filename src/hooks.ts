import { ChangeEvent, useEffect } from 'react';
import JSZip from 'jszip';
import { SAMPLES_URL, SAMPLE_NAMES } from './constants';
import makeSampler from './models/sampler';
import { makeSamplesTable } from './models/samples-map';
import { getSampler, useSamplerContext } from './services/sampler';
import { Sample, setSamples, useSamplesContext } from './services/samples';

export const useDefaultSamples = () => {
  const {
    dispatch,
    state: { setFetchHasError, setSamplesAreLoading },
  } = useSamplesContext();
  const { samplerDispatch } = useSamplerContext();

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
      dispatch(setSamples(initialSamplesTable));
      samplerDispatch(getSampler(sampler));
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

export const useRemoteSamples = () => {
  const {
    dispatch,
    state: { setSamplesAreLoading },
  } = useSamplesContext();
  const { currentOctave, samplerDispatch } = useSamplerContext();
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
      dispatch(setSamples(samplesTable));
      samplerDispatch(getSampler(sampler));
    } catch (e) {
      console.error(e);
    }
    setSamplesAreLoading(false);
  };
  return { getRemoteSamples };
};

const makeLocalSample = (file: File) =>
  new Promise<Sample>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () =>
      resolve({
        arrayBuffer: reader.result as ArrayBuffer,
        fileName: file.name,
      });
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
  });

export const useLocalSamples = () => {
  const {
    dispatch,
    state: { setSamplesAreLoading },
  } = useSamplesContext();
  const { currentOctave, samplerDispatch } = useSamplerContext();
  const getLocalSamples = async (event: ChangeEvent<HTMLInputElement>) => {
    setSamplesAreLoading(true);
    const { files } = event.target;

    const localSamples = await Promise.all(
      Array.from(files).map(makeLocalSample)
    );

    const samplesTable = makeSamplesTable(localSamples, currentOctave);
    dispatch(setSamples(samplesTable));

    try {
      const sampler = await makeSampler(samplesTable);
      samplerDispatch(getSampler(sampler));
    } catch (event) {
      console.warn(event.message);
    }
    setSamplesAreLoading(false);
  };
  return { getLocalSamples };
};
