import { createContext, useContext } from 'react';
import { Octave, SelectorContextType } from './types';

const initialState = {
  currentOctave: 4 as Octave,
};

export const SelectorContext = createContext<SelectorContextType>({
  state: initialState,
});

export const useSelectorContext = () => {
  const store = useContext(SelectorContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSelectorContext` outside of a SelectorProvider'
    );
  }

  return store;
};

export const useSelectorStore = () => {
  return { state: initialState };
};
