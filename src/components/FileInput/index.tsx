import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';

import './style.sass';

interface Props {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = ({ onSelect }: Props) => (
  <>
    <input
      accept={ACCEPTED_MIME_TYPES}
      className="button-upload--input"
      id="upload"
      multiple
      onChange={onSelect}
      type="file"
    />
    <label htmlFor="upload" className="button button-upload">
      Import
    </label>
  </>
);

export default UploadButton;
