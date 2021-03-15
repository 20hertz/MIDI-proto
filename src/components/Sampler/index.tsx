import React from 'react';
import { useSampler } from '../../hooks/useSampler';
import { devOnly } from '../../utils';
import { FileDropZone } from '../FileLoader';
import PadGrid from '../Pads';
import Selector from '../Selector';
import Decor from '../../decor.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import './style.sass';

const Sampler = () => {
  const svgString = encodeURIComponent(renderToStaticMarkup(<Decor />));
  const { areLoading, haveError, samplesTable } = useSampler();
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgString}")`,
      }}
    >
      <FileDropZone>
        <div className="sampler">
          <div />
          <div id="controller">
            <PadGrid areLoading={areLoading} />
          </div>
          {devOnly && false && samplesTable ? (
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
    </div>
  );
};

export default Sampler;
