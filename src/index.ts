import WebMidi, { InputEventNoteoff, InputEventNoteon } from "webmidi";

const soundPaths = Object.values(require("./sounds/*.mp3"));
const sounds = soundPaths.map((path: string) => new Audio(path));
const keys = ["C4", "D4", "E4"];
const keyMap = Object.fromEntries(sounds.map((sound, i) => [keys[i], sound]));

WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Retrieve an input by index
  const input = WebMidi.inputs[0];

  input.addListener("noteon", "all", (event) => handleNoteOnEvent(event));
  input.addListener("noteoff", "all", (event) => handleNoteOffEvent(event));
});

const lightUp = (square: HTMLElement): void => {
  square.style.backgroundColor = "blue";
};

const lightOff = (square: HTMLElement): void => {
  square.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
};

const playback = (note: string): void => {
  keyMap[note].play();
};

function handleNoteOnEvent(event: InputEventNoteon) {
  console.log("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = name + octave;
  const square = document.getElementById(note);
  lightUp(square);
  playback(note);
}

function handleNoteOffEvent(event: InputEventNoteoff) {
  console.log("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = name + octave;
  const square = document.getElementById(note);
  lightOff(square);
}
