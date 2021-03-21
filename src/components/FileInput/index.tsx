import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';
import './style';

interface Props {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = ({ onSelect }: Props) => (
  <label htmlFor="upload" className="button button-upload">
    Import
    <input
      accept={ACCEPTED_MIME_TYPES}
      id="upload"
      multiple
      onChange={onSelect}
      type="file"
    />
  </label>
);

export default UploadButton;
