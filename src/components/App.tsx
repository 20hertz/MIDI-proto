import { h, Fragment } from 'preact';
import { SamplesProvider } from './SamplesProvider';
import { MidiProvider } from './MidiProvider';
import Controller from './Controller';
import SamplesLoader from './SamplesLoader';
import MidiConnector from './MidiConnector';

const App = () => (
  <SamplesProvider>
    <MidiProvider>
      <>
        <h1 className="header">boomTap</h1>
        <SamplesLoader />
        <Controller />
        <MidiConnector />
        <footer>
          <h4>Made with ♥️ by Lø</h4>
        </footer>
      </>
    </MidiProvider>
  </SamplesProvider>
);

export default App;
