import { ChangeEvent, useEffect } from 'react';
import JSZip from 'jszip';
import { SAMPLES_URL, SAMPLE_NAMES } from '../constants';
import {
  getSamplesError,
  getSamplesRequest,
  getSamplesSuccess,
  Sample,
  useSamplesContext,
} from '../services/samples';

export const useDefaultFiles = () => {
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

export const useRemoteFiles = () => {
  const { dispatch } = useSamplesContext();
  const getRemoteSamples = async () => {
    dispatch(getSamplesRequest());
    try {
      const response = await fetch(request);
      const blob = await response.blob();
      const files = await uncompress(blob);
      const remoteSamples = await Promise.all(
        Object.keys(files).map(
          fileName =>
            new Promise<Sample>(async resolve => {
              const arrayBuffer = await files[fileName].async('arraybuffer');
              resolve({
                fileName,
                arrayBuffer,
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

const uncompress = async (blob: Blob) => {
  switch (blob.type) {
    case 'application/zip':
      const { files } = await JSZip.loadAsync(blob);
      return files;

    default:
      throw new Error(`Unknown archive file format: ${blob.type}`);
  }
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

export const useLocalFiles = () => {
  const { dispatch } = useSamplesContext();
  const loadLocalSamples = async (files: FileList) => {
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
  const getLocalSamples = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(getSamplesRequest());
    const { files } = event.target;
    loadLocalSamples(files);
  };

  return { getLocalSamples, loadLocalSamples };
};
