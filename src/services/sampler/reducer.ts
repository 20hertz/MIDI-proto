import { Action, State } from './types';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_SAMPLER':
      return action.payload;
    default:
      return state;
  }
};
