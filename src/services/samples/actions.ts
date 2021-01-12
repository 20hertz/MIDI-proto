import { SPN } from '../../constants';
import { Sample } from './types';

export const setSamples = (data: [SPN, Sample][]) => ({
  type: 'SET_SAMPLES',
  payload: data,
});
