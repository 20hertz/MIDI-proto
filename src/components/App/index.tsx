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
      <div className="container">
        <header>
          <img src={`${logo}`} />
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
