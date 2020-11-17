export const SAMPLE_NAMES = [
  'mouth_snare.mp3',
  'mouth_kick.mp3',
  'mouth_hihat.mp3',
  'mouth_tom1.mp3',
  'mouth_tom2.mp3',
  'mouth_tom3.mp3',
];

export const BUCKET_URL =
  'https://boomtap-proto-test-sample-bucket.s3.ca-central-1.amazonaws.com/';

export const MOUTHKIT_URL =
  'https://drive.google.com/drive/folders/1hKVW2YPxkTh6temzmdqZHm8Qq8VBF9sU?usp=sharing';

export enum Keys {
  C4 = 'C4',
  D4 = 'D4',
  E4 = 'E4',
  F4 = 'F4',
  G4 = 'G4',
  A4 = 'A4',
  B4 = 'B4',
}

export enum keyboardToNoteMap {
  q = Keys.C4,
  w = Keys.D4,
  e = Keys.E4,
  r = Keys.F4,
}
