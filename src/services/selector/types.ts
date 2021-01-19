import { octaves } from '../../constants';

export type SelectorContextType = {
  state: State;
};

export type State = {
  currentOctave: Octave;
};

export type Octave = typeof octaves[number];
