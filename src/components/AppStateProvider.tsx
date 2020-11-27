import { h, JSX } from 'preact';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  children: JSX.Element;
}

type AppContextType = {
  samples: AudioBuffer[];
  setSamples: (buffer: AudioBuffer[]) => void;
  samplesAreLoading: boolean;
  setSamplesAreLoading: (loading: boolean) => void;
  fetchHasError: boolean;
  setFetchHasError: (error: boolean) => void;
  selectedMidiInputId: string;
  selectMidiInputId: (input: string) => void;
};

export const AppContext = createContext<AppContextType>({
  samples: [],
  setSamples: () => {},
  samplesAreLoading: false,
  setSamplesAreLoading: () => {},
  fetchHasError: false,
  setFetchHasError: () => {},
  selectedMidiInputId: 'noinput',
  selectMidiInputId: () => {},
});

const AppStateProvider = (props: Props) => {
  const [selectedMidiInputId, selectMidiInputId] = useState('noinput');
  const [samples, setSamples] = useState([]);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);

  return (
    <AppContext.Provider
      value={{
        samples,
        setSamples,
        samplesAreLoading,
        setSamplesAreLoading,
        fetchHasError,
        setFetchHasError,
        selectedMidiInputId,
        selectMidiInputId,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppStateProvider;
