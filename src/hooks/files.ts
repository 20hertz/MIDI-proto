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

export const useLocalSamples2 = ref => {
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

  const handleDragOver = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    loadLocalSamples(files);
  };

  useEffect(() => {
    ref.current.addEventListener('dragover', handleDragOver);
    ref.current.addEventListener('drop', handleDrop);
    return () => {
      ref.current.removeEventListener('dragover', handleDragOver);
      ref.current.addEventListener('drop', handleDrop);
    };
  }, []);

  const getLocalSamples = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(getSamplesRequest());
    const { files } = event.target;
    loadLocalSamples(files);
  };

  return { getLocalSamples, loadLocalSamples };
};
