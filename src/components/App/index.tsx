import * as React from 'react';
import Providers from '../Providers';
import Sampler from '../Sampler';
import { FileDropZone, FileLoader } from '../FileLoader';
import MidiConnector from '../MidiConnector';
import './style';

const App = () => (
  <>
    <h1 className="header">boomTap</h1>
    <Providers>
      <>
        <FileLoader />
        <FileDropZone children={<Sampler />} />
        <MidiConnector />
      </>
    </Providers>
    <footer>
      <h4>Made with ♥️ by Lø</h4>
    </footer>
  </>
);

export default App;
