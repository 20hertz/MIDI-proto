import { h, Fragment } from 'preact';
import { SamplesProvider } from './SamplesProvider';
import { MidiProvider } from './MidiProvider';
import Controller from './Controller';
import SamplesLoader from './SamplesLoader';
import MidiConnector from './MidiConnector';

const App = () => (
  <>
    <h1 className="header">boomTap</h1>
    <SamplesProvider>
      <MidiProvider>
        <>
          <SamplesLoader />
          <Controller />
          <MidiConnector />
        </>
      </MidiProvider>
    </SamplesProvider>
    <footer>
      <h4>Made with ♥️ by Lø</h4>
    </footer>
  </>
);

export default App;
