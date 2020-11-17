import { h, Fragment, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { decodeAudioData } from 'standardized-audio-context';
import Controller from './components/Controller';
import { audioContext } from './index';
import { BUCKET_URL, SAMPLE_NAMES } from './constants';

const fetchSample = (samplesUrl: string) => async (name: string) => {
  const response = await fetch(samplesUrl + name);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await decodeAudioData(audioContext, arrayBuffer);
  return audioBuffer;
};

const fetchSamples = async (samplesUrl: string) =>
  Promise.all(SAMPLE_NAMES.map(fetchSample(samplesUrl)));

const App = () => {
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadSamples = async () => {
    setIsLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      setSamples(sampleBuffers);
    } catch (error) {
      alert(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  // Fetch samples
  useEffect(() => {
    loadSamples();
  }, [BUCKET_URL]);

  const onChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = async (event: any) => {
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
    };
    reader.onerror = (event) => {
      console.error('An error ocurred reading the file: ', event);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <h1 className="header">Tap dat</h1>
      <form>
        <label>
          Upload
          <input
            type="file"
            name="url"
            onChange={onChange}
            accept="audio/mpeg, audio/wave, audio/wav, audio/x-wav, audio/x-pn-wav, audio/flac"
            multiple
          />
        </label>
      </form>
      {!!samples.length && <Controller samples={samples} />}
      {isLoading && <div>Loading</div>}
      <button>Allow sounds</button>
      <h4>Made with ♥️ by Lø</h4>
    </>
  );
};

export default App;
