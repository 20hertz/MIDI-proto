import { ActionType } from './types';

export const setMidiInput = (data: string) => ({
  type: ActionType.Set,
  payload: data,
});

export type MidiAction = ReturnType<typeof setMidiInput>;
