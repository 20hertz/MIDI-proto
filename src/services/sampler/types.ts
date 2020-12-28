import { octaves } from '../../constants';

export type Octave = typeof octaves[number];

export type SamplerContextType = {
  currentOctave: Octave;
};
