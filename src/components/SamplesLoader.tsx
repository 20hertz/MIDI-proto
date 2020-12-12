import { h } from 'preact';
import { audioContext } from '../index';
import { ACCEPTED_MIME_TYPES, BUCKET_URL } from '../constants';
import { useSamplesContext, getSamples } from './SamplesProvider';
import fetchSamples from '../fetchSamples';
import { useEffect } from 'preact/hooks';

const SamplesLoader = () => {
  const {
    dispatch,
    setFetchHasError,
    setSamplesAreLoading,
  } = useSamplesContext();

  const loadSamples = async () => {
    setSamplesAreLoading(true);
    try {
      const sampleBuffers = await fetchSamples(BUCKET_URL);
      dispatch(getSamples(sampleBuffers));
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
    // TODO
    // for(let i = 0; i < files.length; i++) {
    //       let f = files[i];
    //       ...
    //   }
    const reader = new FileReader();
    reader.onload = async () => {
      setSamplesAreLoading(true);
      try {
        const decodedData = await audioContext.decodeAudioData(
          reader.result as ArrayBuffer
        );
        dispatch(getSamples([decodedData]));
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
      <label htmlFor="upload">
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
