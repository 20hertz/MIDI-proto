import WebMidi, {
  Input as MidiPortInput,
  InputEventNoteoff,
  InputEventNoteon,
} from "webmidi";

enum Keys {
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
}
const BUCKET_URL =
  "https://boomtap-proto-test-sample-bucket.s3.ca-central-1.amazonaws.com/";

const SAMPLE_NAMES = ["mouth_snare.mp3", "mouth_kick.mp3", "mouth_hihat.mp3"];

async function fetchSamples() {
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

const audioCtx = new AudioContext();

function play(audioBuffer: AudioBuffer) {
  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
}

let keyMap;

const keys = [Keys.C4, Keys.D4, Keys.E4];

const createKeyMap = async () => {
  const sampleBuffers = await fetchSamples();
  keyMap = Object.fromEntries(
    sampleBuffers.map((sound, i) => [keys[i], sound])
  );
};

createKeyMap();

const toggleColor = (square: HTMLElement): void => {
  square.classList.toggle("lit");
};

const playback = (note: Keys): void => {
  play(keyMap[note]);
};

type MidiEventTypes = "noteon" | "noteoff";

const listenTo = (eventTypes: MidiEventTypes[]) => (input: MidiPortInput) => {
  eventTypes.forEach((eventType: MidiEventTypes) =>
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

function onMidiEvent(event: InputEventNoteon | InputEventNoteoff) {
  console.debug("event", event);
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

const squares = document.getElementsByClassName("square");
Array.from(squares).forEach((element: HTMLElement) =>
  ["click", "touchstart"].forEach((event) =>
    element.addEventListener(event, () => onSquareClick(element))
  )
);

// function GetChar(event) {
//   const chCode = "charCode" in event ? event.charCode : event.keyCode;
//   console.log("The Unicode character code is: " + chCode);
//   play(sampleBuffer);
// }

// document.onkeypress = (event) => GetChar(event);
