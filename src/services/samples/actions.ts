import { ActionType, Sample } from './types';

export const getSamplesRequest = () => ({
  type: ActionType.GetRequest,
});

export const getSamplesSuccess = (data: Sample[]) => ({
  type: ActionType.GetSuccess,
  payload: data,
});

export const getSamplesError = () => ({
  type: ActionType.GetError,
});
