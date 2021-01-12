import { Sampler } from '../../models/sampler';

export const getSampler = (data: Readonly<Sampler>) => ({
  type: 'GET_SAMPLER',
  payload: data,
});
