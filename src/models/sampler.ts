import { AudioContext } from 'standardized-audio-context';
import { SPN } from '../constants';
import { Sample } from '../services/samples/types';

export interface Sampler {
  trigger: (note: SPN) => void;
}

export type SamplesMap = {
  [note in SPN]: Sample;
};

const makeSampler = async (samplesMap: SamplesMap) => {
  console.debug(
    '🚀 ~ file: sampler.ts ~ line 16 ~ makeSampler ~ samplesMap',
    samplesMap
  );
  const audioContext = new AudioContext();

  const buffers = await Object.keys(samplesMap).reduce(async (map, note) => {
    const { arrayBuffer, fileName } = samplesMap[note] as Sample;
    let buffer: AudioBuffer;
    // TODO: Find a better way to assert for a proper audio file
    if (fileName.match(/\.(?:wav|mp3)$/i)) {
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
