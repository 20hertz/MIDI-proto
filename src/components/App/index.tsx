import React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import MidiConnector from '../MidiConnector';
import { FileLoader } from '../FileLoader';
import './style.sass';
import logo from 'url:../../images/logo.svg';

const App = () => (
  <Providers>
    <>
      <header className="control-panel">
        <div className="control-panel__item logo">
          <img src={`${logo}`} />
        </div>
        <FileLoader className="control-panel__item file-loader" />
        <div className="control-panel__item midi-connector">
          <MidiConnector />
        </div>
      </header>
      <Sampler />
    </>
  </Providers>
);

export default App;
