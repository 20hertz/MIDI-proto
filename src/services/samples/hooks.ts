import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from 'react';
import { reducer } from './reducer';
import { SamplesContextType } from './types';

const initialState = {
  fetchHasError: false,
  samplesTable: [],
  samplesAreLoading: false,
  setFetchHasError: () => null,
  setSamplesAreLoading: () => null,
};

export const SamplesContext = createContext<{
  state: SamplesContextType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

export const useSamplesStore = () => {
  const [fetchHasError, setFetchHasError] = useState(false);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [samplesTable, dispatch] = useReducer(reducer, []);
  return {
    state: {
      fetchHasError,
      samplesTable,
      samplesAreLoading,
      setFetchHasError,
      setSamplesAreLoading,
    },
    dispatch,
  };
};
