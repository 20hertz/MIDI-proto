import React, { ReactNode, useRef } from 'react';
import {
  useDefaultFiles,
  useLocalFiles,
  useRemoteFiles,
} from '../../hooks/useFiles';
import { useDropZone } from '../../hooks/useDropZone';
import { devOnly } from '../../utils';
import FileInput from '../FileInput';

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
  // const { getRemoteSamples } = useRemoteFiles();

  return (
    <>
      <FileInput onSelect={getLocalSamples} />
      {/* {devOnly && true && (
        <button onClick={getRemoteSamples}>Get remote samples</button>
      )} */}
    </>
  );
};
