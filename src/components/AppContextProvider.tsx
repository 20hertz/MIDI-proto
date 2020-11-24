import { h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import webmidi, { Input as MidiInput } from 'webmidi';
import { AppContext } from '../AppContext';

interface Props {
  children: JSX.Element;
}

const AppContextProvider = (props: Props) => {
  const [midiIsConnected, setMidiIsConnected] = useState(false);
  const [midiInputs, setMidiInputs] = useState<MidiInput[]>([]);
  const [selectedMidiInputId, selectMidiInputId] = useState('noinput');
  const [samples, setSamples] = useState<AudioBuffer[]>([]);
  const [samplesAreLoading, setSamplesAreLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);

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
      selectMidiInputId(webmidi.inputs[0].id);
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
    selectMidiInputId(value);
  };

  return (
    <AppContext.Provider
      value={{
        fetchHasError,
        setFetchHasError,
        setSamples,
        selectedMidiInputId,
        samples,
        samplesAreLoading,
        setSamplesAreLoading,
      }}
    >
      {props.children}
      <select value={selectedMidiInputId} onChange={handleSelectChange}>
        {midiInputs.length ? (
          inputOptions()
        ) : (
          <option value="noinput" disabled>
            No MIDI devices
          </option>
        )}
      </select>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
