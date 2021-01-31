import { useEffect, useState } from 'react';
import { makeListeners } from '../models/listeners';
import makeSampler from '../models/sampler';
import { useMidiContext } from '../services/midi';
import { useSamplesContext } from '../services/samples';
import { useSelectorContext } from '../services/selector';

export const useSampler = () => {
  const [sampler, setSampler] = useState(undefined);
  const [samplesTable, setSamplesTable] = useState(undefined);

  const {
    state: { areLoading, haveError, samples },
  } = useSamplesContext();

  const {
    state: { currentOctave },
  } = useSelectorContext();

  const {
    state: { midiInputId },
  } = useMidiContext();

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
    samplesTable,
  };
};
