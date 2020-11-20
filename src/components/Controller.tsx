import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { addAllListeners } from '../listeners';
import Pad from './Pad';
import { Keys } from '../constants';
import { SamplesContext } from './SamplesLoader';

const keys = Object.values(Keys);

const slots = (samples: AudioBuffer[]) => {
  const { length } = samples;
  if (length < 6) return 6;
  if (length > 16) return 16;
  return length;
};

export const createKeyMap = (sampleBuffers: AudioBuffer[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

const Controller = () => {
  const { samples } = useContext(SamplesContext);
  const keyMap = createKeyMap(samples);

  useEffect(() => {
    const { removeAllListeners } = addAllListeners(keyMap);
    return () => removeAllListeners();
  }, [keyMap]);

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
