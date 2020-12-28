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

const SamplesLoader = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();
  const { currentOctave } = useSamplerContext();
  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSamplesAreLoading(true);
    const { files } = event.target;

    const results: LocalSample[] = (await Promise.all(
      Array.from(files).map(
        file =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ result: reader.result, file });
            reader.readAsArrayBuffer(file);
          })
      )
    )) as LocalSample[];

    const sampleMap = makeSamplesMap(results, currentOctave);

    try {
      const sampler = await makeSampler(sampleMap as SamplesMap);
      dispatch(getSampler(sampler));
    } catch (event) {
      console.log(
        'Sorry this browser unable to download this file... try Chrome',
        event
      );
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
