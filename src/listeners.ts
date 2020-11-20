import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import {
  Keys,
  keyboardToNoteMap,
  KEYBOARD_EVENTS,
  MOUSE_EVENTS,
} from './constants';
import { audioContext } from './index';

// Mouse events
interface PadSelectEvent extends Omit<MouseEvent, 'target'> {
  target: HTMLElement;
}

type MidiNoteEvent = InputEvents['noteon' | 'noteoff'];

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle('lit');
};

const play = (audioBuffer: AudioBuffer) => {
  // Create an AudioNode in order to play an AudioBuffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

export const addAllListeners = (keyMap: { [k: string]: AudioBuffer }) => {
  console.log('addAllListeners -> keyMap inside', keyMap);
  const controller = document.getElementById('controller');
  const playback = (note: Keys) => {
    play(keyMap[note]);
  };

  // Mouse events
  const onPadSelect = ({ target, type }: PadSelectEvent) => {
    toggleColor(target);
    if (type === 'mousedown' || type === 'touchstart') {
      playback(target.id as Keys);
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
      playback(note);
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
      playback(keyboardToNoteMap[event.key] as Keys);
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

  addKeyboardListener();
  // addMidiListener();
  addSelectListener();

  const removeAllListeners = () => {
    removeKeyboardListener();
    // removeMidiListener();
    removeMouseListener();
  };

  return {
    removeAllListeners,
  };
};
