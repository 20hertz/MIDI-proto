import { pitches, SPN } from '../constants';
import { Key, Octave } from '../services/selector';
import { Sample } from '../services/samples';

const appendOctave = (octave: Octave, index: number) =>
  pitches[index + (octave + 1) * 12];

const matchPitchToSample = (octave: Octave) => (
  sample: Sample,
  i: number
): Key => [appendOctave(octave, i), sample];

export const makeSamplesTable = (samples: Sample[], octave: Octave) =>
  samples.map(matchPitchToSample(octave));

const matchPitchToFileName = (octave: Octave) => (
  sample: Sample,
  i: number
) => {
  const { fileName } = sample;
  return [appendOctave(octave, i), fileName];
};

export const makeSamplesMap = (samples: Sample[], octave: Octave) =>
  samples.map(matchPitchToFileName(octave));
