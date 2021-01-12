import { octaves } from '../../constants';
import { Sampler } from '../../models/sampler';

export type State = Readonly<Sampler>;
export type Action = { type: string; payload: Readonly<Sampler> };
export type SamplerContextType = {
  samplerDispatch: (action: Action) => void;
  sampler: Sampler;
  currentOctave: Octave;
};

export type Octave = typeof octaves[number];
