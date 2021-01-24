import { Dispatch } from 'react';

export type MidiContextType = {
  state: State;
  dispatch: Dispatch<any>;
};

export type State = {
  midiInputId: string;
};

export enum ActionType {
  Set = 'SET_MIDI_INPUT',
}
