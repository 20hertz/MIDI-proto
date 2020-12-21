import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../constants';
import makeSampler from '../sampler';
import { getSampler } from '../services/samples/actions';
import { useSamplesContext } from './SamplesProvider';
import { Keys } from '../constants';

const SamplesLoader = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    // TODO
    // for(let i = 0; i < files.length; i++) {
    //       let f = files[i];
    //       ...
    //   }
    const reader = new FileReader();
    reader.onload = async () => {
      setSamplesAreLoading(true);
      try {
        const sampler = await makeSampler({
          [Keys.C4]: reader.result as ArrayBuffer,
        });
        dispatch(getSampler(sampler));
      } catch (event) {
        console.log(
          'Sorry this browser unable to download this file... try Chrome',
          event
        );
      }
      setSamplesAreLoading(false);
    };
    reader.onerror = event => {
      console.error('An error ocurred reading the file: ', event);
    };

    reader.readAsArrayBuffer(file);
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
