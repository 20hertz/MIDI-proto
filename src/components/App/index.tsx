import * as React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import { FileLoader } from '../FileLoader';
import MidiConnector from '../MidiConnector';
import Logo from '../../logo.svg';
import './style';

const App = () => (
  <Providers>
    <>
      <div className="container">
        <header>
          <Logo className="logo" />
        </header>
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
