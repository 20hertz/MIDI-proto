import React from 'react';
import Pads from './Pads';
import { useSamplesContext } from '../services/samples';
import { useDefaultSamples } from '../hooks/samples';

const Sampler = () => {
  const { fetchHasError } = useSamplesContext();

  useDefaultSamples();

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        <Pads />
      </div>
      <div className="selector">
        {fetchHasError ? (
          <h4>Sorry, we're unable to download this kit correctly.</h4>
        ) : (
          <h4>Samples</h4>
        )}
      </div>
    </div>
  );
};

export default Sampler;
