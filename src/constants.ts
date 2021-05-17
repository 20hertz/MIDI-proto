export const SAMPLE_NAMES = [
  'mouth_snare.mp3',
  'mouth_kick.mp3',
  'mouth_hihat.mp3',
  'mouth_tom1.mp3',
  'mouth_tom2.mp3',
  'mouth_tom3.mp3',
];

export const ACCEPTED_MIME_TYPES =
  'audio/mpeg, audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav, audio/flac';

export const SAMPLES_URL =
  'https://boomtap-proto-test-sample-bucket.s3.ca-central-1.amazonaws.com/';

export const MOUTHKIT_URL =
  'https://drive.google.com/drive/folders/1hKVW2YPxkTh6temzmdqZHm8Qq8VBF9sU?usp=sharing';

export enum PitchClass {
  C = 'C',
  Csharp = 'C#',
  D = 'D',
  Dsharp = 'D#',
  E = 'E',
  F = 'F',
  Fsharp = 'F#',
  G = 'G',
  Gsharp = 'G#',
  A = 'A',
  Asharp = 'A#',
  B = 'B',
}

export const octaves = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type Octave = typeof octaves[number];

// Scientific Pitch Notation
export type SPN = `${PitchClass}${Octave}`;

const appendOctave = (octaveNumber: Octave) => (note: PitchClass) =>
  (note + octaveNumber) as SPN;

const assembleOctave = (octaveNumber: Octave) =>
  Object.values(PitchClass).map(appendOctave(octaveNumber));

export const pitches = octaves.flatMap(assembleOctave);

export enum keyboardToNoteMap {
  q = 'C4',
  w = 'D4',
  e = 'E4',
  a = 'F4',
  s = 'G4',
  d = 'A4',
}

export const MOUSE_EVENTS = ['mousedown', 'mouseup', 'touchend', 'touchstart'];
export const KEYBOARD_EVENTS = ['keydown', 'keyup'];
