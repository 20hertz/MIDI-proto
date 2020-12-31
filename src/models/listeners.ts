import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import {
  keyboardToNoteMap,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
  SPN,
} from '../constants';
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
  const play = (note: SPN) => {
    sampler.trigger(note);
  };

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
      // Prevent both touch and mouse events to be fired on a single user input.
      // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_firing
      event.preventDefault();
      onPadSelect(event);
    }
  };

  const addSelectListener = () => {
    for (const eventName of MOUSE_EVENTS) {
      controller.addEventListener(eventName, selectListener);
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

  const addMidiListener = (inputId: string) => {
    const input = WebMidi.inputs.find(({ id }) => id === inputId);
    listenTo(['noteon', 'noteoff'])(input);
  };
  const removeMidiListener = (inputId: string) => {
    const input = WebMidi.inputs.find(({ id }) => id === inputId);
    dontListenTo(['noteon', 'noteoff'])(input);
  };
  // Keyboard events
  const onKeyboardEvent: EventListener = (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      play(keyboardToNoteMap[event.key] as SPN);
    }
  };

  const addKeyboardListeners = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      document.addEventListener(eventName, onKeyboardEvent);
    }
  };

  const removeKeyboardListeners = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      document.removeEventListener(eventName, onKeyboardEvent);
    }
  };

  const toggleKeyboardListeners = fn => {
    for (const eventName of KEYBOARD_EVENTS) {
      fn(eventName, onKeyboardEvent);
    }
  };

  const addKeyboardListener = () => {
    toggleKeyboardListeners(document.addEventListener);
  };

  const addListeners = (inputId: string) => {
    addSelectListener();
    addKeyboardListeners();
    // addKeyboardListener();
    if (inputId !== 'noinput') {
      addMidiListener(inputId);
    }
  };

  const removeListeners = (inputId: string) => {
    removeKeyboardListeners();
    removeMouseListener();
    if (inputId !== 'noinput') {
      removeMidiListener(inputId);
    }
  };

  return Object.freeze({
    addListeners,
    removeListeners,
  });
};
