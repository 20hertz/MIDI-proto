import { AudioContext } from 'standardized-audio-context';
import { FileObject } from './components/SamplesLoader';
import { SPN } from './constants';

export interface Sampler {
  trigger: (note: SPN) => void;
}

export interface SamplesMap {
  [note: string]: string | FileObject;
}

const isString = (arg: any) => typeof arg === 'string';

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
    if (isString(kit[note])) {
      buffer = await fetchSample(kit[note] as string);
    } else {
      const arrayBuffer = (kit[note] as FileObject).result;
      buffer = await audioContext.decodeAudioData(arrayBuffer);
    }
    return (await map).set(note, buffer);
  }, Promise.resolve(<Map<string, AudioBuffer>>new Map()));

  const trigger = (note: SPN) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffers.get(note);
    source.connect(audioContext.destination);
    source.start();
  };

  return Object.freeze({ trigger });
};

export default makeSampler;
