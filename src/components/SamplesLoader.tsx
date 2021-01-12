import React from 'react';
import { ACCEPTED_MIME_TYPES } from '../constants';
import { useLocalSamples, useRemoteSamples } from '../hooks';

const SamplesLoader = () => {
  const { getLocalSamples } = useLocalSamples();
  const { getRemoteSamples } = useRemoteSamples();

  return (
    <>
      <form>
        <label htmlFor="upload">
          Upload
          <input
            accept={ACCEPTED_MIME_TYPES}
            id="upload"
            multiple
            onChange={getLocalSamples}
            type="file"
          />
        </label>
      </form>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={getRemoteSamples}>Get remote samples</button>
      )}
    </>
  );
};

export default SamplesLoader;
