import React from 'react';
import { useSampler } from '../../hooks/useSampler';
import { FileDropZone } from '../FileLoader';
import Pads from '../Pads';
import Selector from '../Selector';
import './style.sass';

const Sampler = () => {
  const { areLoading, haveError, keys, samplesTable } = useSampler();
  return (
    <FileDropZone>
      <div className="sampler">
        <div />
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
    </FileDropZone>
  );
};

export default Sampler;
