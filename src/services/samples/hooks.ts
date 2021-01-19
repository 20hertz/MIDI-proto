import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { SamplesContextType } from './types';

const initialState = {
  samples: [],
  areLoading: false,
  haveError: false,
};

export const SamplesContext = createContext<SamplesContextType>({
  state: initialState,
  dispatch: () => null,
});

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
  const [state, dispatch] = useReducer(reducer, initialState);
  return { dispatch, state };
};
