import { useEffect, useState } from 'react';
import { Octave, useSelectorContext } from '../services/selector';
import { PitchClass, SPN } from '../constants';

export const usePads = () => {
  const [keys, setKeys] = useState([]);
  const {
    state: { currentOctave },
  } = useSelectorContext();

  const setActiveKeys = () => {
    const activeKeys = setAvailableKeys(16, currentOctave);
    setKeys(activeKeys);
  };

  useEffect(() => {
    setActiveKeys();
  }, [currentOctave]);

  return { keys };
};

// function debounce(fn: () => void, ms: number) {
//   let timer: number;
//   return () => {
//     clearTimeout(timer);
//     timer = window.setTimeout(() => {
//       timer = null;
//       fn.apply(this, arguments);
//     }, ms);
//   };
// }

const pitchClasses = Object.values(PitchClass);

/**
 *
 * @param slots Number of pads that will be visible to user
 * @param octave The starting octave number on a MIDI device
 */
export const setAvailableKeys = (slots: number, octave: Octave): SPN[] => {
  let renderedKeys = [];

  const appendKey = (key: number) => {
    renderedKeys.push(pitchClasses[key] + octave);
  };

  const renderKeys = (slotsLeft: number) => {
    if (slotsLeft > pitchClasses.length) {
      for (let i = 0; i < pitchClasses.length; i++) {
        appendKey(i);
      }
      octave++;
      renderKeys(slotsLeft - pitchClasses.length);
    } else {
      for (let i = 0; i < slotsLeft; i++) {
        appendKey(i);
      }
    }
  };
  renderKeys(slots);
  return renderedKeys;
};
