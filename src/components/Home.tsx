import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import Controller from './Controller';
import { AppContext } from './AppContextProvider';
import SamplesLoader from './SamplesLoader';
import MidiConnector from './MidiConnector';

const App = () => {
  const { fetchHasError, samples, samplesAreLoading } = useContext(AppContext);

  return (
    <>
      <h1 className="header">boomTap</h1>
      <SamplesLoader />
      {!!samples && !fetchHasError && <Controller />}
      {samplesAreLoading && <div>Loading</div>}
      <MidiConnector />
      <footer>
        <h4>Made with ♥️ by Lø</h4>
      </footer>
    </>
  );
};

export default App;
