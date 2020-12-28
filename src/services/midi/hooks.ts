import { createContext, useContext, useState } from 'react';
import { MidiContextType } from './types';

export const MidiContext = createContext<MidiContextType>(undefined);

export const useMidiContext = () => {
  const store = useContext(MidiContext);

  if (!store) {
    throw new Error('Cannot use `useMidiContext` outside of a MidiProvider');
  }

  return store;
};

export const useMidiStore = () => {
  const [selectedMidiInputId, setSelectedMidiInputId] = useState('noinput');
  return {
    selectedMidiInputId,
    setSelectedMidiInputId,
  };
};
