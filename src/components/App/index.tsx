import * as React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import { FileLoader } from '../FileLoader';
import MidiConnector from '../MidiConnector';
import './style';

const App = () => (
  <Providers>
    <>
      <div className="container">
        <h1 className="header">boomTap</h1>
        <FileLoader />
        <Sampler />
      </div>
      <MidiConnector />
    </>
  </Providers>
);

export default App;
