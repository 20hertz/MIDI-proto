import React from 'react';
import { useSampler } from '../hooks';
import Pads from './Pads';
import Selector from './Selector';

const Sampler = () => {
  const { areLoading, haveError, keys, samplesMap } = useSampler();
  return (
    <div className="sampler">
      <div></div>
      <div id="controller">
        <Pads areLoading={areLoading} keys={keys} />
      </div>
      {samplesMap && (
        <Selector
          samplesMap={samplesMap}
          isLoading={areLoading}
          haveError={haveError}
        />
      )}
    </div>
  );
};

export default Sampler;
