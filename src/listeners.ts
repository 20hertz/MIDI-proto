import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import {
  keyboardToNoteMap,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
  SPN,
} from './constants';
import { Sampler } from './sampler';

// Mouse events
interface PadSelectEvent extends Omit<MouseEvent, 'target'> {
  target: HTMLElement;
}

type MidiNoteEvent = InputEvents['noteon' | 'noteoff'];

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle('lit');
};

export const makeListeners = (sampler: Sampler) => {
  const controller = document.getElementById('controller');
  const play = (note: SPN) => sampler.trigger(note);

  // Mouse events
  const onPadSelect = ({ target, type }: PadSelectEvent) => {
    toggleColor(target);
    if (type === 'mousedown' || type === 'touchstart') {
      play(target.id as SPN);
    }
  };

  const selectListener: EventListener = (event: PadSelectEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('div.pad')) {
      onPadSelect(event);
    }
  };

  const addSelectListener = () => {
    for (const eventName of MOUSE_EVENTS) {
      controller.addEventListener(eventName, selectListener, {
        passive: eventName === 'touchstart',
      });
    }
  };

  const removeMouseListener = () => {
    for (const eventName of MOUSE_EVENTS) {
      controller.removeEventListener(eventName, selectListener);
    }
  };

  // MIDI events
  const midiNoteEvent = (event: MidiNoteEvent) => {
    const {
      note: { name, octave },
      type,
    } = event;
    const note = (name + octave) as SPN;
    const pad = document.getElementById(note);
    toggleColor(pad);
    if (type === 'noteon') {
      play(note);
    }
  };

  const onMidiEvent = <T extends keyof InputEvents>(event: InputEvents[T]) => {
    console.debug('event', event);
    switch (event.type) {
      case 'noteon':
      case 'noteoff':
        midiNoteEvent(event as InputEvents['noteoff' | 'noteon']);
        break;

      default:
        break;
    }
  };

  const listenTo = <T extends keyof InputEvents>(eventTypes: T[]) => (
    input: MidiPortInput
  ) => {
    eventTypes.forEach((eventType: T) =>
      input.addListener(eventType, 'all', onMidiEvent)
    );
  };

  const dontListenTo = <T extends keyof InputEvents>(eventTypes: T[]) => (
    input: MidiPortInput
  ) => {
    eventTypes.forEach((eventType: T) =>
      input.removeListener(eventType, 'all', onMidiEvent)
    );
  };

  const addMidiListener = inputId => {
    const input = WebMidi.inputs.find(({ id }) => id === inputId);
    listenTo(['noteon', 'noteoff'])(input);
  };
  const removeMidiListener = inputId => {
    const input = WebMidi.inputs.find(({ id }) => id === inputId);
    dontListenTo(['noteon', 'noteoff'])(input);
  };
  // Keyboard events
  const keyboardListener: EventListener = (event: KeyboardEvent) => {
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      play(keyboardToNoteMap[event.key] as SPN);
    }
  };

  const addKeyboardListener = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      document.addEventListener(eventName, keyboardListener);
    }
  };

  const removeKeyboardListener = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      document.removeEventListener(eventName, keyboardListener);
    }
  };

  const addListeners = (inputId?: string) => {
    addSelectListener();
    addKeyboardListener();
    if (inputId && inputId !== 'noinput') {
      addMidiListener(inputId);
    }
  };

  const removeListeners = (inputId?: string) => {
    removeKeyboardListener();
    removeMouseListener();
    if (inputId && inputId !== 'noinput') {
      removeMidiListener(inputId);
    }
  };

  return Object.freeze({
    addListeners,
    removeListeners,
  });
};
