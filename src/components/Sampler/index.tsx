import React from 'react';
import { useSampler } from '../../hooks/useSampler';
import { devOnly } from '../../utils';
import { FileDropZone } from '../FileLoader';
import PadGrid from '../Pads';
import Selector from '../Selector';
import './style.sass';

const Sampler = () => {
  const { areLoading, haveError, samplesTable } = useSampler();
  return (
    <FileDropZone>
      <div className="sampler">
        <div />
        <div id="controller">
          <PadGrid areLoading={areLoading} />
        </div>
        {devOnly && false ? (
          <Selector
            haveError={haveError}
            isLoading={areLoading}
            samplesTable={samplesTable}
          />
        ) : (
          <div />
        )}
      </div>
    </FileDropZone>
  );
};

export default Sampler;
