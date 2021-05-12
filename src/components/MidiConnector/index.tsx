import React from 'react';
import { useMidi } from '../../hooks/useMidi';
// import './style.sass';
// import IconMidi from '../../images/icon-midi.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import { convertSvgToDataUrl } from '../../utils';

const MidiConnector = () => {
  const { handleSelectChange, midiInputId, midiInputs } = useMidi();

  const inputOptions = () => {
    for (const input of midiInputs) {
      return <option value={input.id}>{input.name}</option>;
    }
  };

  return (
    <select
      className="dropdown button midi-connector"
      onChange={handleSelectChange}
      value={midiInputId}
      // style={{
      //   backgroundImage: convertSvgToDataUrl(<IconMidi />),
      // }}
    >
      {midiInputs.length ? (
        inputOptions()
      ) : (
        <option value="noinput" disabled>
          No MIDI devices
        </option>
      )}
    </select>
  );
};

export default MidiConnector;
