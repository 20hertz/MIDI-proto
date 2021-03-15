import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';

interface Props {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = ({ onSelect }: Props) => (
  <>
    <label htmlFor="upload" className="button file-upload">
      Upload
    </label>
    <input
      accept={ACCEPTED_MIME_TYPES}
      className="file-input"
      id="upload"
      multiple
      onChange={onSelect}
      type="file"
    />
  </>
);

export default UploadButton;
