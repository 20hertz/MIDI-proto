import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import Controller from './Controller';
import { AppContext } from './AppStateProvider';
import SamplesLoader from './SamplesLoader';
import MidiConnector from './MidiConnector';

const Home = () => {
  const { fetchHasError, samples, samplesAreLoading } = useContext(AppContext);
  console.log('render');
  return (
    <>
      <h1 className="header">boomTap</h1>
      <SamplesLoader />
      {Boolean(samples) && !fetchHasError && <Controller />}
      {samplesAreLoading && <div>Loading</div>}
      <MidiConnector />
      <footer>
        <h4>Made with ♥️ by Lø</h4>
      </footer>
    </>
  );
};

export default Home;
