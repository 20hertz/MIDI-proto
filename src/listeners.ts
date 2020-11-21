import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import {
  Keys,
  keyboardToNoteMap,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
} from './constants';
import { Kit } from './kit';

// Mouse events
interface PadSelectEvent extends Omit<MouseEvent, 'target'> {
  target: HTMLElement;
}

type MidiNoteEvent = InputEvents['noteon' | 'noteoff'];

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle('lit');
};

export const makeListeners = (kit: Kit) => {
  const controller = document.getElementById('controller');
  const play = (note: Keys) => kit.play(note);

  // Mouse events
  const onPadSelect = ({ target, type }: PadSelectEvent) => {
    toggleColor(target);
    if (type === 'mousedown' || type === 'touchstart') {
      play(target.id as Keys);
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
    const note = (name + octave) as Keys;
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

  const midiListener = (err: Error) => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
    }

    // Retrieve an input by index
    const input = WebMidi.inputs[0];
    listenTo(['noteon', 'noteoff'])(input);
  };

  const addMidiListener = () => WebMidi.enable(midiListener);
  const removeMidiListener = () => WebMidi.disable();

  // Keyboard events
  const keyboardListener: EventListener = (event: KeyboardEvent) => {
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      play(keyboardToNoteMap[event.key] as Keys);
    }
  };

  const addKeyboardListener = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      window.addEventListener(eventName, keyboardListener);
    }
  };

  const removeKeyboardListener = () => {
    for (const eventName of KEYBOARD_EVENTS) {
      window.removeEventListener(eventName, keyboardListener);
    }
  };

  const addAllListeners = () => {
    addKeyboardListener();
    // addMidiListener();
    addSelectListener();
  };

  const removeAllListeners = () => {
    removeKeyboardListener();
    // removeMidiListener();
    removeMouseListener();
  };

  return Object.freeze({
    addAllListeners,
    removeAllListeners,
  });
};
