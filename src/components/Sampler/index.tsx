import React, { FC, SVGProps } from 'react';
import { useSampler } from '../../hooks/useSampler';
import { devOnly } from '../../utils';
import { FileDropZone } from '../FileLoader';
import PadGrid from '../Pads';
import Selector from '../Selector';
import Decor from '../../images/decor.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import './style.sass';

export const stringifySvg = (SVG: FC<SVGProps<SVGSVGElement>>) =>
  encodeURIComponent(renderToStaticMarkup(<SVG />));

const Sampler = () => {
  // const { areLoading, haveError, samplesTable } = useSampler();
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,${stringifySvg(Decor)}")`,
      }}
    >
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
