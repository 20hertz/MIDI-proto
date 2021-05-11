import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { MidiContextType } from './types';

const initialState = {
  midiInputId: 'noinput',
};

export const MidiContext = createContext<MidiContextType>({
  state: initialState,
  dispatch: () => null,
});

export const useMidiContext = () => {
  const store = useContext(MidiContext);

  if (!store) {
    throw new Error('Cannot use `useMidiContext` outside of a MidiProvider');
  }

  return store;
};

export const useMidiStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { dispatch, state };
};
