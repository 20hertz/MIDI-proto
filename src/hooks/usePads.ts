import { useEffect, useState } from 'react';
import { PitchClass, SPN, Octave } from '../constants';
import { useSampler } from './useSampler';

export const usePadGrid = () => {
  const { areLoading, samplesTable } = useSampler();

  const [initialColumns, setInitialColumns] = useState(4);

  const [numberOfKeys, setNumberOfKeys] = useState(16);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const numberOfSamples = samplesTable?.length || 0;

    const header = document.getElementsByTagName('header')[0];

    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;

    const { height: headerHeight } = header.getBoundingClientRect();

    const remainingHeight = viewportHeight - headerHeight;

    const numberOfColumnThatFitsWidth = Math.floor((viewportWidth - 10) / 150);

    const numberOfRowThatFitsHeight = Math.floor((remainingHeight - 10) / 150);

    const numberOfInitialColumns =
      numberOfColumnThatFitsWidth < 4 ? numberOfColumnThatFitsWidth : 4;

    const numberOfInitialRows =
      numberOfRowThatFitsHeight < 4 ? numberOfRowThatFitsHeight : 4;

    const numberOfMinKeys = numberOfInitialRows * numberOfInitialColumns;

    const numberOfColumns =
      numberOfSamples > numberOfMinKeys
        ? numberOfSamples / numberOfInitialRows < numberOfColumnThatFitsWidth
          ? Math.floor(numberOfSamples / numberOfInitialRows)
          : numberOfColumnThatFitsWidth
        : numberOfInitialColumns;

    const numberOfRows = Math.ceil(numberOfSamples / numberOfColumns);

    const numberOfKeys =
      numberOfSamples > numberOfMinKeys
        ? numberOfColumns * numberOfRows
        : numberOfMinKeys;

    setNumberOfKeys(numberOfKeys);
    setInitialColumns(numberOfColumns);
  }, [samplesTable]);

  useEffect(() => {
    const keys = setAvailableKeys(numberOfKeys, 4);
    setKeys(keys);
  }, [numberOfKeys, initialColumns]);

  return { areLoading, initialColumns, keys };
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
