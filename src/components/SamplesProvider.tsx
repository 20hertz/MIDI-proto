import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { BUCKET_URL } from '../constants';
import { actions, fetchSamples, reducer, types } from '../services/samples';

interface Props {
  children: ReactNode;
}

const SamplesContext = createContext<types.SamplesContextType>(undefined);

const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

const SamplesProvider = ({ children }: Props) => {
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);
  const [samples, dispatch] = useReducer(reducer, []);

  const loadInitialSamples = async () => {
    setSamplesAreLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      dispatch(actions.getSamples(sampleBuffers));
    } catch (error) {
      window.alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  // Fetch samples
  useEffect(() => {
    loadInitialSamples();
  }, [BUCKET_URL]);

  return (
    <SamplesContext.Provider
      value={{
        dispatch,
        fetchHasError,
        samples,
        samplesAreLoading,
        setFetchHasError,
        setSamplesAreLoading,
      }}
      children={children}
    />
  );
};

export { getSamples, SamplesProvider, useSamplesContext };
