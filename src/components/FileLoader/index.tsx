import React, { ReactNode, useRef } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';
import {
  useDefaultFiles,
  useLocalFiles,
  useRemoteFiles,
} from '../../hooks/useFiles';
import { useDropZone } from '../../hooks/useDropZone';
import { devOnly } from '../../utils';

interface Props {
  children: ReactNode;
}

export const FileDropZone = ({ children }: Props) => {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  useDropZone(dropZoneRef);

  return <div ref={dropZoneRef}>{children}</div>;
};

export const FileLoader = () => {
  useDefaultFiles();
  const { getLocalSamples } = useLocalFiles();
  const { getRemoteSamples } = useRemoteFiles();

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
      {devOnly && (
        <button onClick={getRemoteSamples}>Get remote samples</button>
      )}
    </>
  );
};
