import React from 'react';
import { FileDropZone } from '../FileLoader';
import PadGrid from '../PadGrid';
import './style.sass';

const Sampler = () => {
  return (
    <div className="background">
      <FileDropZone>
        <div className="sampler">
          <PadGrid />
        </div>
      </FileDropZone>
    </div>
  );
};

export default Sampler;
