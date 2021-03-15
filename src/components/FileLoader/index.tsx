import React, { ReactNode, useRef } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';
import {
  useDefaultFiles,
  useLocalFiles,
  useRemoteFiles,
} from '../../hooks/useFiles';
import { useDropZone } from '../../hooks/useDropZone';
import { devOnly } from '../../utils';
import './style';
import '../../fonts/IBMPlexSans/IBMPlexSans-Regular.ttf';
import UploadButton from './UploadButton';

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
    <div className="file-loader">
      <UploadButton onSelect={getLocalSamples} />
      {devOnly && false && (
        <button onClick={getRemoteSamples}>Get remote samples</button>
      )}
    </div>
  );
};
