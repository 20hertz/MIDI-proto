import { useEffect, useState } from 'react';
import { Octave, useSelectorContext } from '../services/selector';
import { PitchClass, SPN } from '../constants';

export const usePads = () => {
  const [keys, setKeys] = useState([]);
  const {
    state: { currentOctave },
  } = useSelectorContext();

  const setActiveKeys = () => {
    const windowWidth = window.innerWidth;
    const activeKeys =
      windowWidth <= 600
        ? setAvailableKeys(calcMaxPads(windowWidth), currentOctave)
        : setAvailableKeys(16, currentOctave);
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

const calcMinColumns = (windowWidth: number) => (windowWidth <= 414 ? 2 : 3);

const padSize = (windowWidth: number) =>
  windowWidth / calcMinColumns(windowWidth);

const samplerArea = (windowWidth: number) =>
  windowWidth * (window.innerHeight - 79);

const padArea = (windowWidth: number) => Math.pow(padSize(windowWidth), 2);

const calcMaxPads = (windowWidth: number) => {
  const capacity = Math.floor(samplerArea(windowWidth) / padArea(windowWidth));
  const roundedDownCapacity =
    Math.floor(capacity / calcMinColumns(windowWidth)) *
    calcMinColumns(windowWidth);

  return roundedDownCapacity;
};
