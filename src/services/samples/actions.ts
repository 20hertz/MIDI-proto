import { Sampler } from '../../sampler';

export const getSampler = (data: Readonly<Sampler>) => ({
  type: 'GET_SAMPLER',
  payload: data,
});
