import WebMidi, { InputEvents } from 'webmidi';
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

  // Mouse events
  const onPadSelect = ({ button, target, type }: PadSelectEvent) => {
    if (button === 0) toggleColor(target);
    if ((button === 0 && type === 'mousedown') || type === 'touchstart') {
      sampler.trigger(target.id as SPN);
    }
  };

  const selectListener: EventListener = (event: PadSelectEvent) => {
    if (event.target.matches('div.pad')) {
      // Prevent both touch and mouse events to be fired on a single user input.
      // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_firing
      event.preventDefault();
      onPadSelect(event);
    }
  };

  const toggleSelectListener = (functionName: string) => {
    for (const eventName of MOUSE_EVENTS) {
      controller[functionName](eventName, selectListener, { passive: true });
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
    if (type === 'noteon') sampler.trigger(note);
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

  const toggleMidiListener = (functionName: string, inputId: string) => {
    const input = WebMidi.inputs.find(({ id }) => id === inputId);
    ['noteon', 'noteoff'].forEach(eventType =>
      input[functionName](eventType, 'all', onMidiEvent)
    );
  };

  // Keyboard events
  const onKeyboardEvent: EventListener = (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      sampler.trigger(keyboardToNoteMap[event.key] as SPN);
    }
  };

  const toggleKeyboardListener = (functionName: string) => {
    for (const eventName of KEYBOARD_EVENTS) {
      document[functionName](eventName, onKeyboardEvent);
    }
  };

  const addListeners = (inputId: string) => {
    toggleSelectListener('addEventListener');
    toggleKeyboardListener('addEventListener');
    if (inputId !== 'noinput') {
      toggleMidiListener('addListener', inputId);
    }
  };

  const removeListeners = (inputId: string) => {
    toggleSelectListener('removeEventListener');
    toggleKeyboardListener('removeEventListener');
    if (inputId !== 'noinput') {
      toggleMidiListener('removeListener', inputId);
    }
  };

  return Object.freeze({
    addListeners,
    removeListeners,
  });
};
