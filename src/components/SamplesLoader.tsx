import { h, JSX } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { audioContext } from '../index';
import { ACCEPTED_MIME_TYPES, BUCKET_URL } from '../constants';
import fetchSamples from '../fetchSamples';
import { AppContext } from './AppContextProvider';

const SamplesLoader = () => {
  const { setSamples, setSamplesAreLoading, setFetchHasError } = useContext(
    AppContext
  );

  const loadSamples = async () => {
    setSamplesAreLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      setSamples(sampleBuffers);
    } catch (error) {
      alert(error);
      setFetchHasError(true);
    }
    setSamplesAreLoading(false);
  };

  // Fetch samples
  useEffect(() => {
    loadSamples();
  }, [BUCKET_URL]);

  const onChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      setSamplesAreLoading(true);
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
      setSamplesAreLoading(false);
    };
    reader.onerror = (event) => {
      console.error('An error ocurred reading the file: ', event);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
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
  );
};

export default SamplesLoader;
