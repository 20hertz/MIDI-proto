import { h, Fragment } from 'preact';
import AppStateProvider from './components/SamplesProvider';
import MidiProvider from './components/MidiProvider';
import Controller from './components/Controller';
import SamplesLoader from './components/SamplesLoader';
import MidiConnector from './components/MidiConnector';

const App = () => (
  <AppStateProvider>
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
  </AppStateProvider>
);

export default App;
