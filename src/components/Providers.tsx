import React, { ReactNode } from 'react';
import { MidiContext, useMidiStore } from '../services/midi';
import { SelectorContext, useSelectorStore } from '../services/selector';
import { SamplesContext, useSamplesStore } from '../services/samples';

interface Props {
  children: ReactNode;
}

const SamplesProvider = ({ children }: Props) => {
  const store = useSamplesStore();
  return <SamplesContext.Provider children={children} value={store} />;
};

const SelectorProvider = ({ children }: Props) => {
  const store = useSelectorStore();
  return <SelectorContext.Provider children={children} value={store} />;
};

const MidiProvider = ({ children }: Props) => {
  const store = useMidiStore();
  return <MidiContext.Provider children={children} value={store} />;
};

const Providers = ({ children }: Props) => (
  <SamplesProvider>
    <SelectorProvider>
      <MidiProvider>{children}</MidiProvider>
    </SelectorProvider>
  </SamplesProvider>
);

export default Providers;
