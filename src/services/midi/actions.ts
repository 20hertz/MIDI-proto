import { ActionType } from './types';
import { Input as MidiInput } from 'webmidi';

export const setMidiInput = (data: MidiInput['id']) => ({
  type: ActionType.Set,
  payload: data,
});

export type MidiAction = ReturnType<typeof setMidiInput>;
