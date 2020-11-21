import { decodeAudioData } from 'standardized-audio-context';
import { audioContext } from './index';
import { SAMPLE_NAMES } from './constants';

const fetchSample = (samplesUrl: string) => async (name: string) => {
  const response = await fetch(samplesUrl + name);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await decodeAudioData(audioContext, arrayBuffer);
  return audioBuffer;
};

export default async (samplesUrl: string) =>
  Promise.all(SAMPLE_NAMES.map(fetchSample(samplesUrl)));
