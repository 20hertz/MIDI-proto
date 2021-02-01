import { useEffect, useState } from 'react';
import { Octave, useSelectorContext } from '../services/selector';
import { PitchClass, SPN } from '../constants';

export const usePads = () => {
  const [keys, setKeys] = useState([]);
  const {
    state: { currentOctave },
  } = useSelectorContext();

  const setActiveKeys = () => {
    const numberOfPads = windowCapacity();
    const activeKeys = setAvailableKeys(numberOfPads, currentOctave);
    setKeys(activeKeys);
  };

  useEffect(() => {
    setActiveKeys();
  }, [currentOctave]);

  useEffect(() => {
    window.addEventListener('resize', setActiveKeys);
    return () => window.removeEventListener('resize', setActiveKeys);
  }, []);

  return { keys };
};

const windowCapacity = () => {
  const { innerWidth } = window;
  if (innerWidth <= 414) return 6;
  else if (innerWidth <= 600) return 12;
  else return 16;
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
const setAvailableKeys = (slots: number, octave: Octave): SPN[] => {
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
