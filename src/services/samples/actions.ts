export const getSamples = (data: AudioBuffer[]) => ({
  type: 'GET_SAMPLES',
  payload: data,
});
