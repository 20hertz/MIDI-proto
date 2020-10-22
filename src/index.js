if (navigator.requestMIDIAccess) {
  console.log("This browser supports WebMIDI!");
} else {
  console.log("WebMIDI is not supported in this browser.");
}

navigator.requestMIDIAccess().then(onMidiSuccess, onMidifailure);

function onMidiSuccess(midiAccess) {
  for (const input of midiAccess.inputs.values()) {
    input.onmidimessage = getMidiMessage;
  }
}

function onMidifailure() {
  console.log("Could not access your MIDI devices.");
}

function getMidiMessage(message) {
  const command = message.data[0];
  const note = message.data[1];
  const velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

  switch (command) {
    case 144: // noteOn
      if (velocity > 0) {
        noteOn(note, velocity);
      } else {
        noteOff(note);
      }
      break;
    case 128: // noteOff
      noteOff(note);
      break;
    // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
  }
}
