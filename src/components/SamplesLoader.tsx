import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../constants';
import makeSampler, { SamplesMap } from '../models/sampler';
import { makeSamplesMap } from '../models/samples-map';
import { useSamplerContext } from '../services/sampler';
import {
  getSampler,
  LocalSample,
  useSamplesContext,
} from '../services/samples';

const makeLocalSample = (file: File) =>
  new Promise<LocalSample>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () =>
      resolve({
        readerResult: reader.result as ArrayBuffer,
        fileName: file.name,
      });
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
  });

const SamplesLoader = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();
  const { currentOctave } = useSamplerContext();
  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSamplesAreLoading(true);
    const { files } = event.target;

    const localSamples = await Promise.all(
      Array.from(files).map(makeLocalSample)
    );

    const sampleMap = makeSamplesMap(localSamples, currentOctave);

    try {
      const sampler = await makeSampler(sampleMap as SamplesMap);
      dispatch(getSampler(sampler));
    } catch (event) {
      console.warn(event.message);
    }
    setSamplesAreLoading(false);
  };

  return (
    <form>
      <label htmlFor="upload">
        Upload
        <input
          accept={ACCEPTED_MIME_TYPES}
          id="upload"
          multiple
          onChange={handleOnChange}
          type="file"
        />
      </label>
    </form>
  );
};

export default SamplesLoader;
