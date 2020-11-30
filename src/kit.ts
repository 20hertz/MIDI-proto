import { audioContext } from './index';
import { Keys, BaseKeys } from './constants';

export interface Kit {
  play: (note: Keys) => void;
}

export const makeKit = (samples: AudioBuffer[]) => {
  const keyMap = createKeyMap(samples);

  const play = (note: Keys) => start(keyMap[note]);

  return Object.freeze({ play });
};

export const keys = Object.values(Keys);

export const baseKeys = Object.values(BaseKeys);

const start = (audioBuffer: AudioBuffer) => {
  // Create an AudioNode in order to play an AudioBuffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

const createKeyMap = (sampleBuffers: AudioBuffer[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));
