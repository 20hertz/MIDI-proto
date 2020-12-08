import { h, JSX } from 'preact';
import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

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

const SamplesContext = createContext<SamplesContextType | undefined>(undefined);

export const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

const SampleStore = () => {
  const [samples, setSamples] = useState([]);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);
  return {
    samples,
    setSamples,
    samplesAreLoading,
    setSamplesAreLoading,
    fetchHasError,
    setFetchHasError,
  };
};

export const SamplesProvider = (props: Props) => (
  <SamplesContext.Provider value={SampleStore()} {...props} />
);
