import { ChangeEvent, useEffect, useState } from 'react';
import JSZip from 'jszip';
import { SAMPLES_URL, SAMPLE_NAMES } from './constants';
import { useSelectorContext } from './services/selector';
import {
  getSamplesError,
  getSamplesRequest,
  getSamplesSuccess,
  Sample,
  useSamplesContext,
} from './services/samples';
import { useMidiContext } from './services/midi';
import { setAvailableKeys } from './helpers';
import { makeListeners } from './models/listeners';
import makeSampler from './models/sampler';

export const useDefaultSamples = () => {
  const { dispatch } = useSamplesContext();

  const createInitialSampler = async () => {
    dispatch(getSamplesRequest());
    try {
      const initialSamples = await fetchSamples();
      dispatch(getSamplesSuccess(initialSamples));
    } catch (error) {
      alert(error);
      dispatch(getSamplesError);
    }
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
  const { dispatch } = useSamplesContext();
  const getRemoteSamples = async () => {
    dispatch(getSamplesRequest());
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

      dispatch(getSamplesSuccess(remoteSamples));
    } catch (error) {
      alert(error.message);
      dispatch(getSamplesError);
    }
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
  const { dispatch } = useSamplesContext();
  const getLocalSamples = async (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(getSamplesRequest());
    const { files } = event.target;

    try {
      const localSamples = await Promise.all(
        Array.from(files).map(makeLocalSample)
      );
      dispatch(getSamplesSuccess(localSamples));
    } catch (event) {
      console.warn(event.message);
      dispatch(getSamplesError);
    }
  };
  return { getLocalSamples };
};

export const useSampler = () => {
  const [sampler, setSampler] = useState(undefined);
  const [samplesMap, setSamplesMap] = useState(undefined);

  const {
    state: { areLoading, haveError, samples },
  } = useSamplesContext();

  const {
    state: { currentOctave },
  } = useSelectorContext();

  const {
    state: { midiInputId },
  } = useMidiContext();

  const keys = setAvailableKeys(16, currentOctave);

  const createSampler = async () => {
    try {
      makeSampler(samples, currentOctave).then(sampler => {
        const { samplesMap } = sampler;
        setSamplesMap(samplesMap);
        setSampler(sampler);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    createSampler();
  }, [currentOctave, samples]);

  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(sampler);
    addListeners(midiInputId);
    return () => removeListeners(midiInputId);
  }, [midiInputId, sampler]);

  return {
    areLoading,
    haveError,
    keys,
    samplesMap,
  };
};
