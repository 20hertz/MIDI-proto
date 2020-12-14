export type State = AudioBuffer[];
export type Action = { type: string; payload: AudioBuffer[] };
export type SamplesContextType = {
  dispatch: (action: Action) => void;
  fetchHasError: boolean;
  samples: AudioBuffer[];
  samplesAreLoading: boolean;
  setFetchHasError: (error: boolean) => void;
  setSamplesAreLoading: (loading: boolean) => void;
};
