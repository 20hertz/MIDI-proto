import React from 'react';
import { useSamplesFetcher } from '../hooks';

const SamplesFetcher = () => {
  const { getRemoteSamples } = useSamplesFetcher();
  if (process.env.NODE_ENV === 'development') {
    return <button onClick={getRemoteSamples}>Get remote samples</button>;
  }
  return null;
};

export default SamplesFetcher;
