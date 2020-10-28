import WebMidi, { InputEventNoteoff, InputEventNoteon } from "webmidi";

enum Keys {
  C4 = "C4",
  D4 = "D4",
  E4 = "E4",
}

const soundPaths = Object.values(require("./sounds/*.mp3"));
const sounds = soundPaths.map((path: string) => new Audio(path));
const keys = [Keys.C4, Keys.D4, Keys.E4];
const keyMap = Object.fromEntries(sounds.map((sound, i) => [keys[i], sound]));

const lightUp = (square: HTMLElement): void => {
  square.style.backgroundColor = "blue";
};

const lightOff = (square: HTMLElement): void => {
  square.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
};

const playback = (note: Keys): void => {
  keyMap[note].play();
};

// MIDI events
WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Retrieve an input by index
  const input = WebMidi.inputs[0];

  input.addListener("noteon", "all", (event) => handleNoteOnEvent(event));
  input.addListener("noteoff", "all", (event) => handleNoteOffEvent(event));
});

function handleNoteOnEvent(event: InputEventNoteon) {
  console.debug("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = (name + octave) as Keys;
  const square = document.getElementById(note);
  lightUp(square);
  playback(note);
}

function handleNoteOffEvent(event: InputEventNoteoff) {
  console.debug("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = (name + octave) as Keys;
  const square = document.getElementById(note);
  lightOff(square);
}

// Mouse events
const onSquareClick = (element: HTMLElement) => {
  const { id } = element;
  lightUp(element);
  playback(id as Keys);
  setTimeout(() => {
    lightOff(element);
  }, 50);
};

const squares = document.getElementsByClassName("square");
Array.from(squares).forEach((element: HTMLElement) =>
  element.addEventListener("click", () => onSquareClick(element))
);
