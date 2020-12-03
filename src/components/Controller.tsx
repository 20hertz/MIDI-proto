import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pads from './Pads';
import { useSamplesContext } from './SamplesProvider';
import { useMidiContext } from './MidiProvider';
import { makeKit, setAvailableKeys } from '../kit';

const Controller = () => {
  const { fetchHasError, samples, samplesAreLoading } = useSamplesContext();
  const { selectedMidiInputId } = useMidiContext();
  const keys = setAvailableKeys(16, 4);
  const kit = makeKit(samples, keys);
  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(kit);
    addListeners(selectedMidiInputId);
    return () => removeListeners(selectedMidiInputId);
  }, [selectedMidiInputId, samples]);

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        {Boolean(samples) && !fetchHasError && <Pads keys={keys} />}
        {samplesAreLoading && <div>Loading</div>}
      </div>
      <div className="selector">Samples</div>
    </div>
  );
};

export default Controller;
