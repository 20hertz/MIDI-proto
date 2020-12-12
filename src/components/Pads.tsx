import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { BaseKeys } from '../constants';
import { makeKit, setAvailableKeys } from '../kit';
import { makeListeners } from '../listeners';
import { useMidiContext } from './MidiProvider';
import { useSamplesContext } from './SamplesProvider';

// interface PadsProps {
//   keys: string[];
// }

const Pads = () => {
  const { samples, samplesAreLoading } = useSamplesContext();
  const { selectedMidiInputId } = useMidiContext();
  const keys = setAvailableKeys(16, 4);
  const kit = makeKit(samples, keys);
  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(kit);
    addListeners(selectedMidiInputId);
    return () => removeListeners(selectedMidiInputId);
  }, [selectedMidiInputId, samples]);

  return (
    <>
      {keys.map((key) => (
        <Pad id={key} loading={samplesAreLoading} />
      ))}
    </>
  );
};

interface Props {
  // id: BaseKeys;
  id: string;
  loading: boolean;
}

const Pad = ({ id, loading }: Props) => (
  <div id={id} className="pad" style={loading && { backgroundColor: 'grey' }} />
);

export default Pads;
