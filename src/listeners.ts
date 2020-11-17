import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import { Keys, keyboardToNoteMap } from './constants';
import { audioContext } from './index';

// Mouse events
interface PadEvent extends Omit<Event, 'target'> {
  target: HTMLElement;
}

type MidiNoteEvent = InputEvents['noteon' | 'noteoff'];

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle('lit');
};

// const play = (audioBuffer: AudioBuffer) => {
const play = (audioBuffer: AudioBuffer) => {
  console.log('play -> audioBuffer', audioBuffer);
  // Create an AudioNode in order to play an AudioBuffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

export const addAllListeners = (keyMap: { [k: string]: AudioBuffer }) => {
  const controller = document.getElementById('controller');

  const playback = (note: Keys) => {
    play(keyMap[note]);
  };

  const onPadClick = ({ target, type }: PadEvent) => {
    toggleColor(target);
    if (type === 'mousedown' || type === 'touchstart') {
      playback(target.id as Keys);
    }
  };

  const controllerListener: EventListener = (event: PadEvent) => {
    const target = event.target as HTMLElement;
    if (target.matches('div.pad')) {
      onPadClick(event);
    }
  };

  for (let eventName of ['mousedown', 'mouseup', 'touchstart', 'touchend']) {
    controller.addEventListener(eventName, controllerListener, {
      passive: eventName === 'touchstart',
    });
  }

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

  const addMidiListener = (err: Error) => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
      return;
    }

    // Retrieve an input by index
    const input = WebMidi.inputs[0];

    listenTo(['noteon', 'noteoff'])(input);
  };

  // MIDI events
  WebMidi.enable(addMidiListener);

  const removeMidiListener = () => WebMidi.disable();

  const keyboardListener: EventListener = (event: KeyboardEvent) => {
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      playback(keyboardToNoteMap[event.key] as Keys);
    }
  };

  for (const eventName of ['keydown', 'keyup']) {
    window.addEventListener(eventName, keyboardListener);
  }

  const removeKeyboardListener = () => {
    for (const eventName of ['keydown', 'keyup']) {
      window.removeEventListener(eventName, keyboardListener);
    }
  };

  const removeAllListeners = () => {
    removeKeyboardListener();
    removeMidiListener();
  };

  return {
    removeAllListeners,
  };
};
