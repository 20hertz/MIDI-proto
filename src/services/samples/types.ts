import { Dispatch } from 'react';

export type SamplesContextType = {
  state: State;
  dispatch: Dispatch<any>;
};

export type State = {
  samples: Sample[];
  areLoading: boolean;
  haveError: boolean;
};

export type Sample = {
  fileName: string;
  arrayBuffer: ArrayBuffer;
};

// Actions
export enum ActionType {
  GetRequest = 'GET_SAMPLES_REQUEST',
  GetSuccess = 'GET_SAMPLES_SUCCESS',
  GetError = 'GET_SAMPLES_ERROR',
}

type ActionPayloads = {
  [ActionType.GetRequest]: undefined;
  [ActionType.GetSuccess]: Sample[];
  [ActionType.GetError]: undefined;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};
export type SamplesAction = ActionMap<ActionPayloads>[keyof ActionMap<ActionPayloads>];
