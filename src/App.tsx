import { h } from 'preact';
import Home from './components/Home';
import AppStateProvider from './components/AppStateProvider';

const App = () => {
  return (
    <AppStateProvider>
      <Home />
    </AppStateProvider>
  );
};

export default App;
