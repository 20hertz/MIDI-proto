import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { createKit } from '../kit';
import { BUCKET_URL, Keys, SAMPLE_NAMES } from '../constants';
import { audioContext } from '../index';
import { decodeAudioData } from 'standardized-audio-context';

const keys = Object.values(Keys);
const renderPads = keys.map((key) => <div id={key} className="pad"></div>);

const fetchSample = (samplesUrl: string) => async (name: string) => {
  const response = await fetch(samplesUrl + name);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await decodeAudioData(audioContext, arrayBuffer);
  return audioBuffer;
};

const fetchSamples = async (samplesUrl: string) =>
  Promise.all(SAMPLE_NAMES.map(fetchSample(samplesUrl)));

interface Props {
  samplesUrl?: string;
  kit?: AudioBuffer[];
}

const Controller = ({ kit, samplesUrl = BUCKET_URL }: Props) => {
  console.log(kit);
  const [isLoading, setIsLoading] = useState(false);

  const loadSamples = async () => {
    setIsLoading(true);
    if (kit.length) {
      createKit(kit);
    } else {
      try {
        const sampleBuffers = await fetchSamples(samplesUrl);
        // Instanciate kit
        createKit(sampleBuffers);
      } catch (error) {
        alert(error);
      }
    }
    setIsLoading(false);
  };

  // Fetch samples
  useEffect(() => {
    // TODO: Clean previous audioContext
    loadSamples();
  }, [kit, samplesUrl]);

  return (
    <div id="controller" className="grid">
      {isLoading ? <div>Loading</div> : renderPads}
    </div>
  );
};

export default Controller;
