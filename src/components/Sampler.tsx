import React from 'react';
import Pads from './Pads';
import { useDefaultSamples } from '../hooks';
import Selector from './Selector';

const Sampler = () => {
  useDefaultSamples();

  return (
    <div className="playground">
      <div></div>
      <div id="controller" className="grid">
        <Pads />
      </div>
      <Selector />
    </div>
  );
};

export default Sampler;
