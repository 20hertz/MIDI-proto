import { h, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import webmidi, { Input as MidiInput } from 'webmidi';
import { MidiContext } from './MidiProvider';

const MidiConnector = () => {
  const [midiIsConnected, setMidiIsConnected] = useState(false);
  const [midiInputs, setMidiInputs] = useState<MidiInput[]>([]);

  const { selectedMidiInputId, setSelectedMidiInputId } = useContext(
    MidiContext
  );

  const scanForMidiInputs = (err: Error) => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    }

    const { inputs } = webmidi;
    setMidiIsConnected(inputs.length && inputs[0].state === 'connected');
  };

  const createDeviceSelection = () => {
    if (midiIsConnected) {
      setMidiInputs(webmidi.inputs);
      setSelectedMidiInputId(webmidi.inputs[0].id);
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

  const handleSelectChange = (
    event: JSX.TargetedEvent<HTMLSelectElement, Event>
  ) => {
    const { value } = event.target as HTMLSelectElement;
    setSelectedMidiInputId(value);
  };

  return (
    <select value={selectedMidiInputId} onChange={handleSelectChange}>
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
