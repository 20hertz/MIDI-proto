import React from 'react';
import { useSampler } from '../../hooks';
import Pads from '../Pads';
import Selector from '../Selector';
import './style.sass';

const Sampler = () => {
  const { areLoading, haveError, keys, samplesTable } = useSampler();
  return (
    <div className="sampler">
      <div></div>
      <div id="controller">
        <Pads areLoading={areLoading} keys={keys} />
      </div>
      {samplesTable && (
        <Selector
          samplesTable={samplesTable}
          isLoading={areLoading}
          haveError={haveError}
        />
      )}
    </div>
  );
};

export default Sampler;
