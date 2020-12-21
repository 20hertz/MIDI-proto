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
  C4sharp = 'C#',
  D4 = 'D4',
  D4sharp = 'D4#',
  E4 = 'E4',
  F4 = 'F4',
  F4sharp = 'F4#',
  G4 = 'G4',
  G4sharp = 'G4#',
  A4 = 'A4',
  A4sharp = 'A4#',
  B4 = 'B4',
}

export const DEFAULT_KIT = Object.fromEntries(
  SAMPLE_NAMES.map((name, i) => [Object.values(Keys)[i], BUCKET_URL + name])
);

export enum BaseKeys {
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
