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

export const BUCKET_URL =
  'https://boomtap-proto-test-sample-bucket.s3.ca-central-1.amazonaws.com/';

export const MOUTHKIT_URL =
  'https://drive.google.com/drive/folders/1hKVW2YPxkTh6temzmdqZHm8Qq8VBF9sU?usp=sharing';

export enum Keys {
  C4 = 'C4',
  C4sharp = 'C#4',
  D4 = 'D4',
  D4sharp = 'D#4',
  E4 = 'E4',
  F4 = 'F4',
  F4sharp = 'F#4',
  G4 = 'G4',
  G4sharp = 'G#4',
  A4 = 'A4',
  A4sharp = 'A#4',
  B4 = 'B4',
}

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

const octaves = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type Octave = typeof octaves[number];

// Scientific Pitch Notation
export type SPN = `${PitchClass}${Octave}`;

const appendOctave = (octave: number) => (note: PitchClass) =>
  note + String(octave);

const assembleOctave = (octave: number) =>
  Object.values(PitchClass).map(appendOctave(octave));

export const pitches = octaves.flatMap(assembleOctave);

export enum keyboardToNoteMap {
  q = Keys.C4,
  w = Keys.D4,
  e = Keys.E4,
  a = Keys.F4,
  s = Keys.G4,
  d = Keys.A4,
}

export const MOUSE_EVENTS = ['mousedown', 'mouseup', 'touchstart', 'touchend'];
export const KEYBOARD_EVENTS = ['keydown', 'keyup'];
