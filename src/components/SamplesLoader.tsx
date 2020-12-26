import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../constants';
import makeSampler, { SamplesMap } from '../sampler';
import { getSampler } from '../services/samples/actions';
import { useSamplesContext } from './SamplesProvider';
import { Keys } from '../constants';

const keys = Object.values(Keys);

export interface FileObject {
  file: File;
  result: ArrayBuffer;
}

const SamplesLoader = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSamplesAreLoading(true);
    const { files } = event.target;

    const results: FileObject[] = (await Promise.all(
      Array.from(files).map(
        file =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ result: reader.result, file });
            reader.readAsArrayBuffer(file);
          })
      )
    )) as FileObject[];
    const sampleMap = Object.fromEntries(
      results.map((result, i) => [keys[i], result])
    );

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
