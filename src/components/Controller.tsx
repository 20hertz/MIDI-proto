import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { makeListeners } from '../listeners';
import Pad from './Pad';
import { AppContext } from './AppStateProvider';
import { makeKit, baseKeys } from '../kit';

const renderPads = (slots: number, octave: number) => {
  let renderedKeys = [];

  const renderKeys = (slotsLeft: number) => {
    if (slotsLeft > baseKeys.length) {
      for (let i = 0; i < baseKeys.length; i++) {
        renderedKeys.push(baseKeys[i] + String(octave));
      }
      octave++;
      renderKeys(slotsLeft - baseKeys.length);
    } else {
      for (let i = 0; i < slotsLeft; i++) {
        renderedKeys.push(baseKeys[i] + String(octave));
      }
    }
  };
  renderKeys(slots);
  return listPads(renderedKeys);
};

const listPads = (keys: string[]) => keys.map((key) => <Pad id={key} />);

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
        {renderPads(16, 4)}
      </div>
      <div className="selector">Samples</div>
    </div>
  );
};

export default Controller;
