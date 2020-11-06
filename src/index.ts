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

type Key = Record<string, AudioBuffer>;
let keyMap: Key;

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

async function fetchSamples(): Promise<AudioBuffer[]> {
  let sampleBuffers = [];
  await Promise.all(
    SAMPLE_NAMES.map(async (name) => {
      const response = await fetch(BUCKET_URL + name);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      sampleBuffers.push(audioBuffer);
    })
  );
  return sampleBuffers;
}

// TODO:  Only create AudioContext when user has interacted with the domain (click, tap, etc.),
//        or else it will be created in the "suspended" state
const audioCtx = new AudioContext();

function play(audioBuffer: AudioBuffer) {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
}

const createKeyMap = async () => {
  const sampleBuffers = await fetchSamples();
  keyMap = Object.fromEntries(
    sampleBuffers.map((sound, i) => [keys[i], sound])
  );
  console.log("createKeyMap -> keyMap", keyMap);
};

createKeyMap();

const toggleColor = (square: HTMLElement): void => {
  square.classList.toggle("lit");
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
  const square = document.getElementById(note);
  toggleColor(square);
  if (type === "noteon") {
    playback(note);
  }
}

// Mouse events
const onSquareClick = (element: HTMLElement) => {
  const { id } = element;
  toggleColor(element);
  playback(id as Keys);
  setTimeout(() => {
    toggleColor(element);
  }, 50);
};

const squares = document.getElementsByClassName("square") as HTMLCollectionOf<
  HTMLElement
>;

for (const square of squares) {
  ["click", "touchstart"].forEach((event) =>
    square.addEventListener(event, () => onSquareClick(square))
  );
}

enum keyboardToNoteMap {
  a = Keys.C4,
}

const keyboardPlay = (key: string) => playback(keyboardToNoteMap[key] as Keys);

document.onkeypress = (event) => keyboardPlay(event.key);
