import React from 'react';
import { FileDropZone, FileLoader } from '../FileLoader';
import PadGrid from '../PadGrid';
import './style.sass';
import logo from 'url:../../images/logo.svg';
import MidiConnector from '../MidiConnector';

const Sampler = () => {
  return (
    <div className="background">
      <FileDropZone>
        <div className="sampler">
          <div className="motherGrid">
            <div className="header">
              <div className="control-panel__item logo">
                <img src={`${logo}`} />
              </div>
              <FileLoader className="control-panel__item file-loader" />
              <div className="control-panel__item midi-connector">
                <MidiConnector />
              </div>
            </div>
            <PadGrid />
          </div>
        </div>
      </FileDropZone>
    </div>
  );
};

export default Sampler;
