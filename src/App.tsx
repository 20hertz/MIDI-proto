import { h } from 'preact';
import Home from './components/Home';
import AppContextProvider from './components/AppContextProvider';

const App = () => {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
};

export default App;
