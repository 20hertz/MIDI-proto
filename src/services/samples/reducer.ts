import { ActionType, SamplesAction, State } from './types';

export const reducer = (state: State, action: SamplesAction) => {
  switch (action.type) {
    case ActionType.GetRequest:
      return { ...state, areLoading: true };
    case ActionType.GetSuccess:
      return { ...state, samples: action.payload, areLoading: false };
    case ActionType.GetError:
      return { ...state, haveError: true, areLoading: false };
    default:
      return state;
  }
};
