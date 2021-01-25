import { ChangeEvent, useEffect, useState } from 'react';
import webmidi, { WebMidi } from 'webmidi';
import { setMidiInput, useMidiContext } from '../services/midi';

export const useMidi = () => {
  const [midiIsConnected, setMidiIsConnected] = useState(false);
  const [midiInputs, setMidiInputs] = useState<WebMidi['inputs']>([]);

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

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(setMidiInput(value));
  };
  return {
    handleSelectChange,
    midiInputId,
    midiInputs,
  };
};
