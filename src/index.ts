import WebMidi, { InputEventNoteon } from "webmidi";

WebMidi.enable((err) => {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Retrieve an input by index
  const input = WebMidi.inputs[0];

  input.addListener("noteon", "all", (event) => handleInputEvent(event));
});

const flashSquare = (note: string): void => {
  const square = document.getElementById(note);
  square.style.backgroundColor = "blue";
};

function handleInputEvent(event: InputEventNoteon) {
  console.log("event", event);
  const {
    note: { name, octave },
  } = event;
  const note = name + octave;
  flashSquare(note);
}
