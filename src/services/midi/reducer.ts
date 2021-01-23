import { MidiAction } from './actions';
import { ActionType, State } from './types';

export const reducer = (state: State, action: MidiAction) => {
  switch (action.type) {
    case ActionType.Set:
      return { midiInputId: action.payload };
    default:
      return state;
  }
};
