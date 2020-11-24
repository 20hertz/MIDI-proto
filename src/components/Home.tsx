import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import Controller from './Controller';
import { AppContext } from '../AppContext';
import SamplesLoader from './SamplesLoader';

const App = () => {
  const { fetchHasError, samples, samplesAreLoading } = useContext(AppContext);

  return (
    <>
      <h1 className="header">boomTap</h1>
      <SamplesLoader />
      {!!samples && !fetchHasError && <Controller />}
      {samplesAreLoading && <div>Loading</div>}
      <footer>
        <h4>Made with ♥️ by Lø</h4>
      </footer>
    </>
  );
};

export default App;
