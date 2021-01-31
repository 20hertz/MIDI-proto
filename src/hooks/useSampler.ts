import { useEffect, useState } from 'react';
import { setAvailableKeys } from '../helpers';
import { makeListeners } from '../models/listeners';
import makeSampler from '../models/sampler';
import { useMidiContext } from '../services/midi';
import { useSamplesContext } from '../services/samples';
import { useSelectorContext } from '../services/selector';

export const useSampler = () => {
  const [sampler, setSampler] = useState(undefined);
  const [samplesTable, setSamplesTable] = useState(undefined);
  const [keys, setKeys] = useState([]);

  const {
    state: { areLoading, haveError, samples },
  } = useSamplesContext();

  const {
    state: { currentOctave },
  } = useSelectorContext();

  const {
    state: { midiInputId },
  } = useMidiContext();

  const setActiveKeys = () => {
    const activeKeys =
      window.innerWidth <= 600
        ? setAvailableKeys(lowerMultiple(), currentOctave)
        : setAvailableKeys(16, currentOctave);
    setKeys(activeKeys);
  };

  const windowArea = () => window.innerWidth * (window.innerHeight - 79);

  const numberOfColumns = () => (window.innerWidth <= 414 ? 2 : 3);

  const padSize = () => window.innerWidth / numberOfColumns();
  const lowerMultiple = () => {
    const numberOfSquaresThatFitIn = Math.floor(
      windowArea() / Math.pow(padSize(), 2)
    );
    return (
      Math.floor(numberOfSquaresThatFitIn / numberOfColumns()) *
      numberOfColumns()
    );
  };

  useEffect(() => {
    setActiveKeys();
  }, [currentOctave]);

  useEffect(() => {
    window.addEventListener('resize', setActiveKeys);
    return () => window.removeEventListener('resize', setActiveKeys);
  }, []);

  const createSampler = async () => {
    try {
      makeSampler(samples, currentOctave).then(sampler => {
        const { samplesTable } = sampler;
        setSamplesTable(samplesTable);
        setSampler(sampler);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    createSampler();
  }, [currentOctave, samples]);

  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(sampler);
    addListeners(midiInputId);
    return () => removeListeners(midiInputId);
  }, [midiInputId, sampler]);

  return {
    areLoading,
    haveError,
    keys,
    samplesTable,
  };
};
