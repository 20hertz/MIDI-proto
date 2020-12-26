import React, { useContext, useState, createContext } from 'react';

interface Props {
  children: JSX.Element;
}

type MidiContextType = {
  selectedMidiInputId: string;
  setSelectedMidiInputId: (input: string) => void;
};

const MidiContext = createContext<MidiContextType>(undefined);

export const useMidiContext = () => {
  const store = useContext(MidiContext);

  if (!store) {
    throw new Error('Cannot use `useMidiContext` outside of a MidiProvider');
  }

  return store;
};

const MidiStore = () => {
  const [selectedMidiInputId, setSelectedMidiInputId] = useState('noinput');
  return {
    selectedMidiInputId,
    setSelectedMidiInputId,
  };
};

export const MidiProvider = ({ children }: Props) => (
  <MidiContext.Provider value={MidiStore()}>{children}</MidiContext.Provider>
);
