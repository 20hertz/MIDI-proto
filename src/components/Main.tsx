import { h, Fragment } from 'preact';
import { useContext } from 'preact/hooks';
import Controller from './Controller';
import { SamplesContext } from './SamplesLoader';

const App = () => {
  const { fetchIsInError, samples, samplesAreLoading } = useContext(
    SamplesContext
  );

  return (
    <>
      <h1 className="header">boomTap</h1>
      {!!samples && !fetchIsInError && <Controller />}
      {samplesAreLoading && <div>Loading</div>}
      <select>
        <optgroup label="MIDI Devices">
          <option value="midi">MIDI</option>
        </optgroup>
        <optgroup label="Others">
          <option value="midi">Keyboard</option>
        </optgroup>
      </select>
      <footer>
        <h4>Made with ♥️ by Lø</h4>
      </footer>
    </>
  );
};

export default App;
