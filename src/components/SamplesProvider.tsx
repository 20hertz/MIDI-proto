import React, { ReactNode, createContext, useContext } from 'react';
import { hooks, types } from '../services/samples';

interface Props {
  children: ReactNode;
}

const SamplesContext = createContext<types.SamplesContextType>(undefined);

const useSamplesContext = () => {
  const store = useContext(SamplesContext);

  if (!store) {
    throw new Error(
      'Cannot use `useSamplesContext` outside of a SamplesProvider'
    );
  }

  return store;
};

const SamplesProvider = ({ children }: Props) => {
  const store = hooks.useInitSamples();

  return <SamplesContext.Provider value={store} children={children} />;
};

export { SamplesProvider, useSamplesContext };
