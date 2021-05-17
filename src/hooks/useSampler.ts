import { useEffect, useState } from 'react';
import { makeListeners } from '../models/listeners';
import makeSampler from '../models/sampler';
import { useMidiContext } from '../services/midi';
import { useSamplesContext } from '../services/samples';

export const useSampler = () => {
  const [sampler, setSampler] = useState(undefined);
  const [samplesTable, setSamplesTable] = useState(undefined);

  const {
    state: { areLoading, haveError, samples },
  } = useSamplesContext();

  const {
    state: { midiInputId },
  } = useMidiContext();

  const createSampler = async () => {
    try {
      makeSampler(samples, 4).then(sampler => {
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
  }, [samples]);

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
