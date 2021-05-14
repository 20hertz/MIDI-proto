import React from 'react';
// import { useSampler } from '../../hooks/useSampler';
import { FileDropZone } from '../FileLoader';
import PadGrid from '../Pads';
// import Selector from '../Selector';
import './style.sass';

const Sampler = () => {
  // const { areLoading, haveError, samplesTable } = useSampler();
  return (
    <div className="background">
      <FileDropZone>
        <div className="sampler">
          <div />
          <div id="controller">
            <PadGrid />
          </div>
          {/* {devOnly && false && samplesTable ? (
            <Selector
              haveError={haveError}
              isLoading={areLoading}
              samplesTable={samplesTable}
            />
          ) : (
            <div />
          )} */}
        </div>
      </FileDropZone>
    </div>
  );
};

export default Sampler;
