import React, { useEffect } from 'react';
import { SPN } from '../constants';
import { setAvailableKeys } from '../helpers';
import { makeListeners } from '../models/listeners';
import { useMidiContext } from '../services/midi';
import { useSamplerContext } from '../services/sampler';
import { useSamplesContext } from '../services/samples';

const Pads = () => {
  const { sampler, samplesAreLoading } = useSamplesContext();
  const { currentOctave } = useSamplerContext();
  const { selectedMidiInputId } = useMidiContext();
  const keys = setAvailableKeys(16, currentOctave);
  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(sampler);
    addListeners(selectedMidiInputId);
    return () => removeListeners(selectedMidiInputId);
  }, [selectedMidiInputId, sampler]);

  return (
    <>
      {keys.map(key => (
        <Pad id={key} key={key} loading={samplesAreLoading} />
      ))}
    </>
  );
};

interface Props {
  id: SPN;
  loading: boolean;
}

const Pad = ({ id, loading }: Props) => (
  <div
    id={id}
    className="pad"
    style={loading ? { backgroundColor: 'grey' } : {}}
  />
);

export default Pads;
