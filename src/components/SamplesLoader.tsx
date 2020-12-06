import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { audioContext } from '../index';
import { ACCEPTED_MIME_TYPES, BUCKET_URL } from '../constants';
import fetchSamples from '../fetchSamples';
import { useSamplesContext } from './SamplesProvider';

const SamplesLoader = () => {
  const {
    setSamples,
    setSamplesAreLoading,
    setFetchHasError,
  } = useSamplesContext();

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

  const handleOnChange = ({ target }) => {
    const file = (target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setSamplesAreLoading(true);
      try {
        const decodedData = await audioContext.decodeAudioData(
          reader.result as ArrayBuffer
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
      <label for="upload">
        Upload
        <input
          accept={ACCEPTED_MIME_TYPES}
          id="upload"
          multiple
          onChange={handleOnChange}
          type="file"
        />
      </label>
    </form>
  );
};

export default SamplesLoader;
