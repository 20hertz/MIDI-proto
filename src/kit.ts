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

export const createKeyMap = (sampleBuffers: AudioBuffer[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

/**
 *
 * @param slots Number of pads that will be visible to user
 * @param octave The starting octave number on a MIDI device
 */
export const setAvailableKeys = (slots: number, octave: number): string[] => {
  let renderedKeys = [];

  const renderKeys = (slotsLeft: number) => {
    if (slotsLeft > baseKeys.length) {
      for (let i = 0; i < baseKeys.length; i++) {
        renderedKeys.push(baseKeys[i] + String(octave));
      }
      octave++;
      renderKeys(slotsLeft - baseKeys.length);
    } else {
      for (let i = 0; i < slotsLeft; i++) {
        renderedKeys.push(baseKeys[i] + String(octave));
      }
    }
  };
  renderKeys(slots);
  return renderedKeys;
};
