import { createContext, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { audioContext } from '../index';
import { BUCKET_URL } from '../constants';
import fetchSamples from '../fetch';

export const SamplesContext = createContext({
  fetchIsInError: false,
  samples: [],
  samplesAreLoading: false,
});

const SamplesContextProvider = (props) => {
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

  return (
    <SamplesContext.Provider
      value={{
        fetchIsInError: isError,
        samples: samples,
        samplesAreLoading: isLoading,
      }}
    >
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
      {props.children}
    </SamplesContext.Provider>
  );
};

export default SamplesContextProvider;
