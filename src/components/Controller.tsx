import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pad from './Pad';
import { AppContext } from './AppStateProvider';
import { makeKit, setAvailableKeys } from '../kit';

const renderPads = (keys: string[]) => keys.map((key) => <Pad id={key} />);
const availableKeys = setAvailableKeys(16, 4);

const Controller = () => {
  const { selectedMidiInputId, samples } = useContext(AppContext);
  const kit = makeKit(samples);

  useEffect(() => {
    const { addListeners, removeListeners } = makeListeners(kit);
    addListeners(selectedMidiInputId);
    return () => removeListeners(selectedMidiInputId);
  }, [selectedMidiInputId, samples]);

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        {renderPads(availableKeys)}
      </div>
      <div className="selector">Samples</div>
    </div>
  );
};

export default Controller;
