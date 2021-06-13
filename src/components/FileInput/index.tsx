import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';

interface Props {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton = ({ onSelect }: Props) => (
  <>
    <input
      accept={ACCEPTED_MIME_TYPES}
      className="btn-upload"
      id="upload"
      multiple
      onChange={onSelect}
      type="file"
    />
    <label
      htmlFor="upload"
      className="btn btn-upload__label btn__icon--upload btn--lg-sm"
    >
      Import
    </label>
  </>
);

export default UploadButton;
