import { createContext } from 'preact';

type AppContextType = {
  setSamples: (buffer: AudioBuffer[]) => void;
  selectedMidiInputId: string;
  samples: AudioBuffer[];
  samplesAreLoading: boolean;
  setSamplesAreLoading: (loading: boolean) => void;
  fetchHasError: boolean;
  setFetchHasError: (error: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  fetchHasError: false,
  setFetchHasError: () => {},
  setSamples: () => {},
  selectedMidiInputId: 'noinput',
  samples: [],
  samplesAreLoading: false,
  setSamplesAreLoading: () => {},
});
