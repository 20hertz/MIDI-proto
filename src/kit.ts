import WebMidi, { Input as MidiPortInput, InputEvents } from 'webmidi';
import { Keys } from './constants';
import { audioContext } from './index';

// Mouse events
interface PadEvent extends Omit<Event, 'target'> {
  target: HTMLElement;
}

const keys = Object.values(Keys);

const play = (audioBuffer: AudioBuffer) => {
  // Create an AudioNode in order to play an AudioBuffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
};

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle('lit');
};

const createKeyMap = (sampleBuffers: AudioBuffer[]) =>
  Object.fromEntries(sampleBuffers.map((sound, i) => [keys[i], sound]));

type MidiNoteEvent = InputEvents['noteon' | 'noteoff'];

export const createKit = (sampleBuffers: AudioBuffer[]) => {
  const controller = document.getElementById('controller');

  const keyMap: Record<string, AudioBuffer> = createKeyMap(sampleBuffers);

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

  for (const eventName of ['mousedown', 'mouseup', 'touchstart', 'touchend']) {
    controller.addEventListener(eventName, controllerListener, {
      passive: eventName === 'touchstart',
    });
  }

  function midiNoteEvent(event: MidiNoteEvent) {
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
  }

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
      input.addListener(eventType, 'all', (event) => onMidiEvent(event))
    );
  };

  // MIDI events
  WebMidi.enable((err) => {
    if (err) {
      console.log('WebMidi could not be enabled.', err);
      return;
    }

    // Retrieve an input by index
    const input = WebMidi.inputs[0];

    listenTo(['noteon', 'noteoff'])(input);
  });

  enum keyboardToNoteMap {
    a = Keys.C4,
  }

  const keyboardListener: EventListener = (event: KeyboardEvent) => {
    const pad = document.getElementById(keyboardToNoteMap[event.key]);
    toggleColor(pad);
    if (event.type === 'keydown') {
      playback(keyboardToNoteMap[event.key] as Keys);
    }
  };

  // TODO: Remove event listener when component unmounts
  for (const eventName of ['keydown', 'keyup']) {
    document.addEventListener(eventName, keyboardListener);
  }
};
