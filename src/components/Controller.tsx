import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pad from './Pad';
import { SamplesContext } from './SamplesLoader';
import { makeKit, keys } from '../kit';

const slots = (samples: AudioBuffer[]) => {
  const { length } = samples;
  if (length < 6) return 6;
  if (length > 16) return 16;
  return length;
};

const Controller = () => {
  const { selectedMidiInputId, samples } = useContext(SamplesContext);
  const kit = makeKit(samples);

  useEffect(() => {
    const { addListeners, removeAllListeners } = makeListeners(kit);
    addListeners(selectedMidiInputId);
    return () => removeAllListeners(selectedMidiInputId);
  }, [selectedMidiInputId, samples]);

  const renderPads = keys
    .slice(0, slots(samples))
    .map((key) => <Pad id={key} />);

  return (
    <div id="controller" className="grid">
      {renderPads}
    </div>
  );
};

export default Controller;
