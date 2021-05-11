import { AudioContext } from 'standardized-audio-context';
import { SPN } from '../constants';
import { Octave } from '../services/selector';
import { Sample } from '../services/samples';
import { makeSamplesTable } from './samples-map';

export interface Sampler {
  samplesMap: any;
  trigger: (note: SPN) => void;
}

const makeSampler = async (samples: Sample[], startingOctave: Octave) => {
  const audioContext = new AudioContext();

  const samplesTable = makeSamplesTable(samples, startingOctave);

  const audioMap = await samplesTable.reduce(async (map, sample) => {
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
    source.buffer = audioMap.get(key);
    source.connect(audioContext.destination);
    source.start();
  };

  return Object.freeze({ samplesTable, trigger });
};

export default makeSampler;
