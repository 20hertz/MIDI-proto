import { h } from 'preact';
import Main from './components/Main';
import SamplesContextProvider from './components/SamplesLoader';

const App = () => {
  return (
    <SamplesContextProvider>
      <Main />
    </SamplesContextProvider>
  );
};

export default App;
