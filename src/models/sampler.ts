import { AudioContext } from 'standardized-audio-context';
import { SPN } from '../constants';
import { LocalSample, RemoteSample, Sample } from '../services/samples/types';

export interface Sampler {
  trigger: (note: SPN) => void;
}

export type SamplesMap = {
  [note in SPN]: Sample;
};

const isRemote = (arg: any) => 'url' in arg;

const makeSampler = async (samplesMap: SamplesMap) => {
  const audioContext = new AudioContext();

  const fetchSample = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const buffers = await Object.keys(samplesMap).reduce(async (map, note) => {
    let buffer: AudioBuffer;
    if (isRemote(samplesMap[note])) {
      buffer = await fetchSample(samplesMap[note].url);
    } else {
      const { readerResult } = samplesMap[note] as LocalSample;
      buffer = await audioContext.decodeAudioData(readerResult);
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
