import { h, JSX } from 'preact';
import { createContext } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
  children: JSX.Element;
}

type MidiContextType = {
  selectedMidiInputId: string;
  setSelectedMidiInputId: (input: string) => void;
};

export const MidiContext = createContext<MidiContextType | undefined>(
  undefined
);

const MidiStore = () => {
  const [selectedMidiInputId, setSelectedMidiInputId] = useState('noinput');
  return {
    selectedMidiInputId,
    setSelectedMidiInputId,
  };
};

const MidiProvider = ({ children }: Props) => (
  <MidiContext.Provider value={MidiStore()}>{children}</MidiContext.Provider>
);

export default MidiProvider;
