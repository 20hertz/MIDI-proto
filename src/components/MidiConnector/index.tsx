import React from 'react';
import { useMidi } from '../../hooks/useMidi';

const MidiConnector = () => {
  const { handleSelectChange, midiInputId, midiInputs } = useMidi();

  const inputOptions = () => {
    for (const input of midiInputs) {
      return <option value={input.id}>{input.name}</option>;
    }
  };

  return (
    <select
      className="btn btn-dropdown btn__icon--midi btn--sm"
      onChange={handleSelectChange}
      value={midiInputId}
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
