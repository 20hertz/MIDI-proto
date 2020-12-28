import React, { ReactNode } from 'react';
import { MidiContext, useMidiStore } from '../services/midi';
import { SamplerContext, useSamplerStore } from '../services/sampler';
import { useSamplesStore, SamplesContext } from '../services/samples';

interface Props {
  children: ReactNode;
}

const SamplesProvider = ({ children }: Props) => {
  const store = useSamplesStore();

  return <SamplesContext.Provider value={store} children={children} />;
};

const SamplerProvider = ({ children }: Props) => {
  const store = useSamplerStore();

  return <SamplerContext.Provider value={store} children={children} />;
};

const MidiProvider = ({ children }: Props) => {
  const store = useMidiStore();
  return <MidiContext.Provider value={store} children={children} />;
};

const Providers = ({ children }: Props) => (
  <SamplesProvider>
    <SamplerProvider>
      <MidiProvider>{children}</MidiProvider>
    </SamplerProvider>
  </SamplesProvider>
);

export default Providers;
