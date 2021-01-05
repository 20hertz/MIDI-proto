import { pitches, SPN } from '../constants';
import { Octave } from '../services/sampler';
import { Sample } from '../services/samples';

const appendOctave = (octave: Octave, index: number) =>
  pitches[index + (octave + 1) * 12];

const matchPitchToSample = (octave: Octave) => (
  sample: Sample,
  i: number
): [SPN, Sample] => [appendOctave(octave, i), sample];

export const makeSamplesTable = (samples: Sample[], octave: Octave) =>
  samples.map(matchPitchToSample(octave));
