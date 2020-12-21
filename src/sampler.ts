import { AudioContext } from 'standardized-audio-context';
import { Keys } from './constants';

export interface Sampler {
  trigger: (note: Keys) => void;
}

interface SamplesMap {
  [note: string]: string | ArrayBuffer;
}

const makeSampler = async (kit: SamplesMap) => {
  const audioContext = new AudioContext();

  const fetchSample = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const buffers = await Object.keys(kit).reduce(async (map, note) => {
    let buffer: AudioBuffer;
    if (kit[note] instanceof ArrayBuffer) {
      buffer = await audioContext.decodeAudioData(kit[note] as ArrayBuffer);
    } else {
      buffer = await fetchSample(kit[note] as string);
    }
    return (await map).set(note, buffer);
  }, Promise.resolve(<Map<string, AudioBuffer>>new Map()));

  const trigger = (note: Keys) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffers.get(note);
    source.connect(audioContext.destination);
    source.start();
  };

  return Object.freeze({ trigger });
};

export default makeSampler;
