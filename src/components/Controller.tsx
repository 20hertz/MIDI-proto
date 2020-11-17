import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { addAllListeners } from '../listeners';
import Pad from './Pad';
import { Keys } from '../constants';

const keys = Object.values(Keys);

const slots = (samples: AudioBuffer[]) => {
  const { length } = samples;
  if (length < 4) return 4;
  if (length > 16) return 16;
  return length;
};

interface Props {
  samples: AudioBuffer[];
}

export const createKeyMap = (sampleBuffers: AudioBuffer[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

const Controller = ({ samples }: Props) => {
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
