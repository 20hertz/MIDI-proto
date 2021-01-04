import { AudioContext } from 'standardized-audio-context';
import { SPN } from '../constants';
import { LocalSample, Sample } from '../services/samples/types';

export interface Sampler {
  trigger: (note: SPN) => void;
}

export type SamplesMap = {
  [note in SPN]: Sample;
};

const isRemote = (arg: any) => 'url' in arg;

const makeSampler = async (samplesMap: SamplesMap) => {
  console.log(
    '🚀 ~ file: sampler.ts ~ line 16 ~ makeSampler ~ samplesMap',
    samplesMap
  );
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
      const { arrayBuffer, fileName } = samplesMap[note] as LocalSample;
      // TODO: Find a better way to assert for a proper audio file
      if (fileName.match(/\.(?:wav|mp3)$/i)) {
        buffer = await audioContext.decodeAudioData(arrayBuffer);
      }
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
