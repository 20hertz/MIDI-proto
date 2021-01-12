import React from 'react';
import { useSamplesContext } from '../services/samples';

const Selector = () => {
  const {
    fetchHasError,
    samplesAreLoading,
    samplesTable,
  } = useSamplesContext();

  const listSamples = samplesTable.map(sample => {
    const [pitch, { fileName }] = sample;
    return <li key={pitch}>{`${pitch} - ${fileName}`}</li>;
  });

  return (
    <div className="selector">
      {samplesAreLoading ? (
        <div>Loading</div>
      ) : fetchHasError ? (
        <h4>Sorry, we're unable to download this kit correctly.</h4>
      ) : (
        <>
          <h4>Samples</h4>
          <ul>{listSamples}</ul>
        </>
      )}
    </div>
  );
};

export default Selector;
