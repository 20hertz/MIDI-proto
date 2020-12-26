import React, { useEffect } from 'react';
import { SPN } from '../constants';
import { setAvailableKeys } from '../kit';
import { makeListeners } from '../listeners';
import { useMidiContext } from './MidiProvider';
import { useSamplesContext } from './SamplesProvider';

const Pads = () => {
  const { sampler, samplesAreLoading } = useSamplesContext();
  const { selectedMidiInputId } = useMidiContext();
  const keys = setAvailableKeys(16, 4);
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
