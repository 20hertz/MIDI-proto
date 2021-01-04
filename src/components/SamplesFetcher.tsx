import JSZip from 'jszip';
import React, { MouseEvent } from 'react';
import makeSampler, { SamplesMap } from '../models/sampler';
import { makeSamplesMap } from '../models/samples-map';
import { useSamplerContext } from '../services/sampler';
import {
  getSampler,
  LocalSample,
  useSamplesContext,
} from '../services/samples';

const LOCAL_URL = '/google-drive/';
const PATH = 'uc?id=';
const ID = '10ZKzj_ihTSxDvnk-Yt9QE61vaD-q4d-v';
const request = new Request(LOCAL_URL + PATH + ID, { redirect: 'follow' });

const SamplesFetcher = () => {
  const { dispatch, setSamplesAreLoading } = useSamplesContext();
  const { currentOctave } = useSamplerContext();
  const handleOnClick = async (event: MouseEvent) => {
    event.preventDefault();
    setSamplesAreLoading(true);
    try {
      const response = await fetch(request);
      const blob = await response.blob();
      const { files } = await JSZip.loadAsync(blob);

      const localSamples = await Promise.all(
        Object.keys(files).map(
          filename =>
            new Promise<LocalSample>(async resolve => {
              const fileData = await files[filename].async('arraybuffer');
              resolve({
                fileName: filename,
                arrayBuffer: fileData,
              });
            })
        )
      );

      const sampleMap = makeSamplesMap(localSamples, currentOctave);
      const sampler = await makeSampler(sampleMap as SamplesMap);
      dispatch(getSampler(sampler));
    } catch (e) {
      console.error(e);
    }
    setSamplesAreLoading(false);
  };
  if (process.env.NODE_ENV === 'development') {
    return <button onClick={handleOnClick}>Test</button>;
  }
  return null;
};

export default SamplesFetcher;
