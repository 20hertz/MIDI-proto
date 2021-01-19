import { octaves } from '../../constants';
import { Sampler } from '../../models/sampler';

export type SelectorContextType = {
  state: State;
};

export type State = {
  currentOctave: Octave;
};

export type Octave = typeof octaves[number];
