import { Sampler } from '../../models/sampler';

export type State = Readonly<Sampler>;
export type Action = { type: string; payload: Readonly<Sampler> };
export type SamplesContextType = {
  dispatch: (action: Action) => void;
  fetchHasError: boolean;
  sampler: Sampler;
  samplesAreLoading: boolean;
  setFetchHasError: (error: boolean) => void;
  setSamplesAreLoading: (loading: boolean) => void;
};

export interface LocalSample {
  // file: File;
  fileName: string;
  arrayBuffer: ArrayBuffer;
}

export interface RemoteSample {
  name: string;
  url: string;
}

export type Sample = RemoteSample | LocalSample;
