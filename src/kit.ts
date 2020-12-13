import { AudioContext } from 'standardized-audio-context';
import { Keys, BaseKeys } from './constants';

export interface Kit {
  play: (note: Keys) => void;
}

const audioContext = new AudioContext();

export const makeKit = (samples: AudioBuffer[], keys: string[]) => {
  const keyMap = createKeyMap(samples, keys);

  const play = (note: Keys) => start(keyMap[note]);

  return Object.freeze({ play });
};

export const baseKeys = Object.values(BaseKeys);

const start = (audioBuffer: AudioBuffer) => {
  // Create an AudioNode in order to play an AudioBuffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

export const createKeyMap = (sampleBuffers: AudioBuffer[], keys: string[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

/**
 *
 * @param slots Number of pads that will be visible to user
 * @param octave The starting octave number on a MIDI device
 */
export const setAvailableKeys = (slots: number, octave: number): string[] => {
  let renderedKeys = [];

  const appendKey = (key: number) =>
    renderedKeys.push(baseKeys[key] + String(octave));

  const renderKeys = (slotsLeft: number) => {
    if (slotsLeft > baseKeys.length) {
      for (let i = 0; i < baseKeys.length; i++) {
        appendKey(i);
      }
      octave++;
      renderKeys(slotsLeft - baseKeys.length);
    } else {
      for (let i = 0; i < slotsLeft; i++) {
        appendKey(i);
      }
    }
  };
  renderKeys(slots);
  return renderedKeys;
};
