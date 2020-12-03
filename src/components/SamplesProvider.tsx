import { h, JSX } from 'preact';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  children: JSX.Element;
}

type SamplesContextType = {
  samples: AudioBuffer[];
  setSamples: (buffer: AudioBuffer[]) => void;
  samplesAreLoading: boolean;
  setSamplesAreLoading: (loading: boolean) => void;
  fetchHasError: boolean;
  setFetchHasError: (error: boolean) => void;
};

export const SamplesContext = createContext<SamplesContextType | undefined>(
  undefined
);

const SamplesProvider = ({ children }: Props) => {
  const [samples, setSamples] = useState([]);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);

  return (
    <SamplesContext.Provider
      value={{
        samples,
        setSamples,
        samplesAreLoading,
        setSamplesAreLoading,
        fetchHasError,
        setFetchHasError,
      }}
    >
      {children}
    </SamplesContext.Provider>
  );
};

export default SamplesProvider;
