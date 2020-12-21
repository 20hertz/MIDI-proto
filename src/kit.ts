import { Keys, BaseKeys } from './constants';

export const baseKeys = Object.values(BaseKeys);

export const createSamplesMap = (
  sampleBuffers: AudioBuffer[],
  keys: string[]
) => Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

/**
 *
 * @param slots Number of pads that will be visible to user
 * @param octave The starting octave number on a MIDI device
 */
export const setAvailableKeys = (slots: number, octave: number): Keys[] => {
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
