import { useEffect } from 'preact/hooks';
import { getSamples, useSamplesContext } from '../components/SamplesProvider';
import { BUCKET_URL } from '../constants';
import fetchSamples from '../fetchSamples';

export const useInitSampleLoad = () => {
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
};
