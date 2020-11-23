import { createContext, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { audioContext } from '../index';
import { ACCEPTED_MIME_TYPES, BUCKET_URL } from '../constants';
import fetchSamples from '../fetchSamples';
import webmidi from 'webmidi';

export const SamplesContext = createContext({
  fetchIsInError: false,
  selectedMidiInputId: 'noinput',
  samples: [],
  samplesAreLoading: false,
});

const SamplesContextProvider = (props) => {
  const [midiIsConnected, setMidiIsConnected] = useState(false);
  const [midiInputs, setMidiInputs] = useState([]);
  const [selectedMidiInputId, selectMidiInputId] = useState('noinput');
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadSamples = async () => {
    setIsLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      setSamples(sampleBuffers);
    } catch (error) {
      alert(error);
      setHasError(true);
    }
    setIsLoading(false);
  };

  const scanForMidiInputs = (err: Error) => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    }

    const { inputs } = webmidi;
    if (inputs.length && inputs[0].state === 'connected') {
      setMidiIsConnected(true);
    }
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

  // Fetch samples
  useEffect(() => {
    loadSamples();
  }, [BUCKET_URL]);

  const onChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      setIsLoading(true);
      try {
        const decodedData = await audioContext.decodeAudioData(
          event.target.result
        );
        setSamples([decodedData]);
      } catch (event) {
        console.log(
          'Sorry this browser unable to download this file... try Chrome',
          event
        );
      }
      setIsLoading(false);
    };
    reader.onerror = (event) => {
      console.error('An error ocurred reading the file: ', event);
    };

    reader.readAsArrayBuffer(file);
  };

  const deviceOptions = () => {
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
    <SamplesContext.Provider
      value={{
        fetchIsInError: hasError,
        selectedMidiInputId,
        samples,
        samplesAreLoading: isLoading,
      }}
    >
      <form>
        <label>
          Upload
          <input
            accept={ACCEPTED_MIME_TYPES}
            multiple
            name="url"
            onChange={onChange}
            type="file"
          />
        </label>
      </form>
      {props.children}
      <select value={selectedMidiInputId} onChange={handleSelectChange}>
        {midiInputs.length ? (
          deviceOptions()
        ) : (
          <option value="noinput" disabled>
            No MIDI devices
          </option>
        )}
      </select>
    </SamplesContext.Provider>
  );
};

export default SamplesContextProvider;
