import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
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

const SamplesContext = React.createContext<SamplesContextType>(undefined);

const useSamplesContext = () => {
  const store = React.useContext(SamplesContext);

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
  const [samplesAreLoading, setSamplesAreLoading] = React.useState(false);
  const [fetchHasError, setFetchHasError] = React.useState(false);
  const [samples, dispatch] = React.useReducer(reducer, []);

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
