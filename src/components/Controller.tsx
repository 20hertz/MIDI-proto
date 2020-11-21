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
  const { samples } = useContext(SamplesContext);
  const kit = makeKit(samples);

  useEffect(() => {
    const { addAllListeners, removeAllListeners } = makeListeners(kit);
    addAllListeners();
    return () => removeAllListeners();
  }, [samples]);

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
