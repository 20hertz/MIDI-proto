import { h, Fragment } from 'preact';
import { useContext, useState } from 'preact/hooks';
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
      <footer>
        <h4>Made with ♥️ by Lø</h4>
      </footer>
    </>
  );
};

export default App;
