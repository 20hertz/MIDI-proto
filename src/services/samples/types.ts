import { SPN } from '../../constants';

export type State = [SPN, Sample][];
export type Action = { type: string; payload: SamplesTable };
export type SamplesContextType = {
  fetchHasError: boolean;
  samplesTable: SamplesTable;
  samplesAreLoading: boolean;
  setFetchHasError: (error: boolean) => void;
  setSamplesAreLoading: (loading: boolean) => void;
};

export type Key = [SPN, Sample];
export type SamplesTable = [SPN, Sample][];

export interface Sample {
  fileName: string;
  arrayBuffer: ArrayBuffer;
}
