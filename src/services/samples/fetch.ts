import { AudioContext } from 'standardized-audio-context';
import { SAMPLE_NAMES } from '../../constants';

const fetchSample = (samplesUrl: string) => async (name: string) => {
  const audioContext = new AudioContext();
  const response = await fetch(samplesUrl + name);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export default async (samplesUrl: string) =>
  Promise.all(SAMPLE_NAMES.map(fetchSample(samplesUrl)));
