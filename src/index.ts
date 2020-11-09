import WebMidi, { Input as MidiPortInput, InputEvents } from "webmidi";

enum Keys {
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
  G4 = "G4",
  A4 = "A4",
  B4 = "B4",
}
const keys = Object.values(Keys);

let keyMap: Record<string, AudioBuffer>;

const BUCKET_URL =
  "https://boomtap-proto-test-sample-bucket.s3.ca-central-1.amazonaws.com/";

const SAMPLE_NAMES = [
  "mouth_snare.mp3",
  "mouth_kick.mp3",
  "mouth_hihat.mp3",
  "mouth_tom1.mp3",
  "mouth_tom2.mp3",
  "mouth_tom3.mp3",
];

let sampleBuffers: AudioBuffer[] = [];

const fetchSample = async (name: string) => {
  const response = await fetch(BUCKET_URL + name);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  sampleBuffers.push(audioBuffer);
};

const downloadSamples = async () =>
  await Promise.all(SAMPLE_NAMES.map(fetchSample)).catch(console.error);

// TODO:  Only create AudioContext when user has interacted with the domain (click, tap, etc.),
//        or else it will be created in the "suspended" state
const audioCtx = new AudioContext();

const play = (audioBuffer: AudioBuffer) => {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
};

const createKeyMap = async () => {
  await downloadSamples();
  keyMap = Object.fromEntries(
    sampleBuffers.map((sound, i) => [keys[i], sound])
  );
  console.log("createKeyMap -> keyMap", keyMap);
};

createKeyMap();

const toggleColor = (pad: HTMLElement) => {
  pad.classList.toggle("lit");
};

const playback = (note: Keys): void => {
  play(keyMap[note]);
};

const listenTo = <T extends keyof InputEvents>(eventTypes: T[]) => (
  input: MidiPortInput
) => {
  eventTypes.forEach((eventType: T) =>
    input.addListener(eventType, "all", (event) => onMidiEvent(event))
  );
};

// MIDI events
WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Retrieve an input by index
  const input = WebMidi.inputs[0];

  listenTo(["noteon", "noteoff"])(input);
});

function onMidiEvent<T extends keyof InputEvents>(event: InputEvents[T]) {
  console.debug("event", event);
  switch (event.type) {
    case "noteon":
    case "noteoff":
      midiNoteEvent(event as InputEvents["noteoff" | "noteon"]);
      break;

    default:
      break;
  }
}

type MidiNoteEvent = InputEvents["noteon" | "noteoff"];

function midiNoteEvent(event: MidiNoteEvent) {
  const {
    note: { name, octave },
    type,
  } = event;
  const note = (name + octave) as Keys;
  const pad = document.getElementById(note);
  toggleColor(pad);
  if (type === "noteon") {
    playback(note);
  }
}

// Mouse events
interface PadEvent extends Omit<Event, "target"> {
  target: HTMLElement;
}

const onPadClick = ({ target, type }: PadEvent) => {
  toggleColor(target);
  if (type === "mousedown" || type === "touchstart") {
    playback(target.id as Keys);
  }
};

const controller = document.getElementById("controller");

const controllerListener: EventListener = (event: PadEvent) => {
  const target = event.target as HTMLElement;
  if (target.matches("div.pad")) {
    onPadClick(event);
  }
};

["mousedown", "mouseup", "touchstart", "touchend"].forEach(
  (eventName: keyof GlobalEventHandlersEventMap) => {
    controller.addEventListener(eventName, controllerListener, {
      passive: eventName === "touchstart",
    });
  }
);

enum keyboardToNoteMap {
  a = Keys.C4,
}

const keyboardPlay = (key: string) => playback(keyboardToNoteMap[key] as Keys);

document.onkeypress = (event) => keyboardPlay(event.key);
