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
          <img src={`${logo}`} className="logo" />
        </header>
        <div className="buttons" id="buttons">
          <FileLoader />
          <MidiConnector />
        </div>
        <Sampler />
      </div>
    </>
  </Providers>
);

export default App;
