import { h, JSX, createContext } from 'preact';
import { useContext, useReducer, useState } from 'preact/hooks';

interface Props {
  children: JSX.Element;
}

type Action = { type: string; payload: AudioBuffer[] };
type State = AudioBuffer[];

type SamplesContextType = {
  dispatch: (action: Action) => void;
  fetchHasError: boolean;
  samples: AudioBuffer[];
  samplesAreLoading: boolean;
  setFetchHasError: (error: boolean) => void;
  setSamplesAreLoading: (loading: boolean) => void;
};

const SamplesContext = createContext<SamplesContextType>(undefined);

const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_SAMPLES':
      return action.payload;
    default:
      return state;
  }
};

const getSamples = (data: AudioBuffer[]) => ({
  type: 'GET_SAMPLES',
  payload: data,
});

const SampleStore = () => {
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);
  const [samples, dispatch] = useReducer(reducer, []);

  return {
    dispatch,
    fetchHasError,
    samples,
    samplesAreLoading,
    setFetchHasError,
    setSamplesAreLoading,
  };
};

const SamplesProvider = (props: Props) => (
  <SamplesContext.Provider value={SampleStore()} {...props} />
);

export { getSamples, SamplesProvider, useSamplesContext };
