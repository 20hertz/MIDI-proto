import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pad from './Pad';
import { AppContext } from './AppStateProvider';
import { makeKit, keys } from '../kit';

const Controller = () => {
  const { selectedMidiInputId, samples } = useContext(AppContext);
  const kit = makeKit(samples);

  useEffect(() => {
    const { addListeners, removeAllListeners } = makeListeners(kit);
    addListeners(selectedMidiInputId);
    return () => removeAllListeners(selectedMidiInputId);
  }, [selectedMidiInputId, samples]);

  const renderPads = keys.map((key) => <Pad id={key} />);

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        {renderPads}
      </div>
      <div className="selector">Samples</div>
    </div>
  );
};

export default Controller;
