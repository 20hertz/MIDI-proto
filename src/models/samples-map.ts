import { Octave, pitches, SPN } from '../constants';
import { Sample } from '../services/samples';

const appendOctave = (octave: Octave, index: number): SPN =>
  pitches[index + (octave + 1) * 12];

const matchPitchToSample =
  (octave: Octave) =>
  (sample: Sample, i: number): [SPN, Sample] =>
    [appendOctave(octave, i), sample];

export const makeSamplesTable = (samples: Sample[], octave: Octave) =>
  samples.map(matchPitchToSample(octave));
