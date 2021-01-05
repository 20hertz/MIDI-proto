import { AudioContext } from 'standardized-audio-context';
import { SPN } from '../constants';
import { Sample } from '../services/samples/types';

export interface Sampler {
  trigger: (note: SPN) => void;
}

export type SamplesTable = [SPN, Sample][];

const makeSampler = async (samplesTable: SamplesTable) => {
  console.debug(
    '🚀 ~ file: sampler.ts ~ line 16 ~ makeSampler ~ samplesMap',
    samplesTable
  );
  const audioContext = new AudioContext();

  const samplesMap = await samplesTable.reduce(async (map, sample) => {
    const [pitch, { arrayBuffer, fileName }] = sample;
    // TODO: Find a better way to assert for a proper audio file
    const isValid = fileName.match(/\.(?:wav|mp3)$/i);
    const audioBuffer = isValid
      ? await audioContext.decodeAudioData(arrayBuffer)
      : null;
    return isValid ? (await map).set(pitch, audioBuffer) : map;
  }, Promise.resolve(<Map<SPN, AudioBuffer>>new Map()));

  const trigger = (key: SPN) => {
    const source = audioContext.createBufferSource();
    source.buffer = samplesMap.get(key);
    source.connect(audioContext.destination);
    source.start();
  };

  return Object.freeze({ trigger });
};

export default makeSampler;
