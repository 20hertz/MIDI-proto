import React, { ChangeEvent, useEffect, useState } from 'react';
import webmidi, { Input as MidiInput } from 'webmidi';
import { setMidiInput, useMidiContext } from '../services/midi';

const MidiConnector = () => {
  const [midiIsConnected, setMidiIsConnected] = useState(false);
  const [midiInputs, setMidiInputs] = useState<MidiInput[]>([]);

  const {
    dispatch,
    state: { midiInputId },
  } = useMidiContext();

  const scanForMidiInputs = (err: Error) => {
    if (err) {
      console.debug('WebMidi could not be enabled.', err);
    }

    const { inputs } = webmidi;
    setMidiIsConnected(inputs.length && inputs[0].state === 'connected');
  };

  const createDeviceSelection = () => {
    if (midiIsConnected) {
      setMidiInputs(webmidi.inputs);
      dispatch(setMidiInput(webmidi.inputs[0].id));
    }
  };

  useEffect(() => {
    webmidi.enable(scanForMidiInputs);
    return () => webmidi.disable();
  }, []);

  useEffect(() => {
    createDeviceSelection();
  }, [midiIsConnected]);

  const inputOptions = () => {
    for (const input of midiInputs) {
      return <option value={input.id}>{input.name}</option>;
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(setMidiInput(value));
  };

  return (
    <select value={midiInputId} onChange={handleSelectChange}>
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
