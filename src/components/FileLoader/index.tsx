import React, { ReactNode, useEffect, useRef } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';
import {
  useDefaultSamples,
  useLocalSamples,
  useLocalSamples2,
  useRemoteSamples,
} from '../../hooks/files';

interface Props {
  children: ReactNode;
}

export const FileDropZone = ({ children }: Props) => {
  const dropZone = useRef(null);
  useLocalSamples2(dropZone);

  return <div ref={dropZone}>{children}</div>;
};

export const FileLoader = () => {
  useDefaultSamples();
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
