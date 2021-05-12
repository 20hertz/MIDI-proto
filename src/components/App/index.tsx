import React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import MidiConnector from '../MidiConnector';
import { FileLoader } from '../FileLoader';
import './style.sass';

const App = () => (
  <Providers>
    <>
      <div className="container">
        <div className="buttons">
          <FileLoader />
        </div>
        <Sampler />
      </div>
      <MidiConnector />
    </>
  </Providers>
);

export default App;
