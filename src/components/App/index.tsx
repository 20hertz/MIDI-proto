import * as React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import { FileLoader } from '../FileLoader';
import MidiConnector from '../MidiConnector';
import ReactLogo from '../../logo-horizontal-light.svg';
import './style';

const App = () => (
  <Providers>
    <>
      <div className="container">
        <ReactLogo />
        <FileLoader />
        <Sampler />
      </div>
      <MidiConnector />
    </>
  </Providers>
);

export default App;
