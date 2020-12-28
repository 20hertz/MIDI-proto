import { pitches, SPN } from '../constants';
import { Octave } from '../services/sampler';
import { Sample } from '../services/samples';

const offset = (octave: Octave, index: number) =>
  pitches[index + (octave + 1) * 12];

const matchPitchToSample = (octave: Octave) => (
  sample: Sample,
  i: number
): [SPN, Sample] => [offset(octave, i), sample];

export const makeSamplesMap = (samples: Sample[], octave: Octave) =>
  Object.fromEntries(samples.map(matchPitchToSample(octave)));
