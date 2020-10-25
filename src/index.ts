import WebMidi, { InputEventNoteoff, InputEventNoteon } from "webmidi";

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

function playback(note) {
  // const audioSample = document.getElementById(
  //   `audio-${note}`
  // ) as HTMLAudioElement;
  // audioSample.play();
  const sound = new Audio(`./mouth_kick.467237a6.mp3`);
  sound.play();
}

function handleNoteOnEvent(event: InputEventNoteon) {
  console.log("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = name + octave;
  const square = document.getElementById(note);
  lightUp(square);
  playback(note);
  // const audio = new Audio("./mouth_kick.mp3");
  // audio.play();
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
