import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pads from './Pads';
import { SamplesContext } from './SamplesProvider';
import { MidiContext } from './MidiProvider';
import { makeKit, setAvailableKeys } from '../kit';

const Controller = () => {
  const { fetchHasError, samples, samplesAreLoading } = useContext(
    SamplesContext
  );
  const { selectedMidiInputId } = useContext(MidiContext);
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
