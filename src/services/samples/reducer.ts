import { Action, State } from './types';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_SAMPLES':
      return action.payload;
    default:
      return state;
  }
};
