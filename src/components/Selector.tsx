import React from 'react';
import { useSamplesContext } from '../services/samples';

const Selector = () => {
  const { fetchHasError } = useSamplesContext();

  return (
    <div className="selector">
      {fetchHasError ? (
        <h4>Sorry, we're unable to download this kit correctly.</h4>
      ) : (
        <h4>Samples</h4>
      )}
    </div>
  );
};

export default Selector;
