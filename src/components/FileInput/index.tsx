import React, { ChangeEvent } from 'react';
import { ACCEPTED_MIME_TYPES } from '../../constants';
import IconUpload from '../../images/icon-upload.svg';
import { convertSvgToDataUrl } from '../../utils';

import './style';

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
    <label
      htmlFor="upload"
      className="button button-upload"
      style={{
        backgroundImage: convertSvgToDataUrl(<IconUpload />),
      }}
    >
      Import
    </label>
  </>
);

export default UploadButton;
