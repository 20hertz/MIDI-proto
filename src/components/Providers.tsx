import React, { ReactNode } from 'react';
import { MidiContext, useMidiStore } from '../services/midi';
import { SamplesContext, useSamplesStore } from '../services/samples';

interface Props {
  children: ReactNode;
}

const SamplesProvider = ({ children }: Props) => {
  const store = useSamplesStore();
  return <SamplesContext.Provider children={children} value={store} />;
};

const MidiProvider = ({ children }: Props) => {
  const store = useMidiStore();
  return <MidiContext.Provider children={children} value={store} />;
};

const Providers = ({ children }: Props) => (
  <SamplesProvider>
    <MidiProvider>{children}</MidiProvider>
  </SamplesProvider>
);

export default Providers;
